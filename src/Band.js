import React, { Component } from 'react';
import './App.css';
import { Button } from "@progress/kendo-react-buttons";
import Menu from './Menu';

class Band extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            image: '',
            link: '',
            band: '',
            historico: []
        }
    }

    componentDidMount(){
        let cached = [];
        for(var i = 0; i < localStorage.length; i++){
            cached = cached.concat(localStorage.getItem(localStorage.key(i)));
        }
        this.setState({
            historico: cached
        })
    }

    store = (band) => {
        this.setState({
            historico: this.state.historico.concat(band)
        }, () => {
            this.state.historico.forEach((item) => {
                localStorage.setItem(band, JSON.stringify(item));
            })
        });
    }

    callApi(band){
        if(this.props.offline){
            console.log("Você está offline");
            this.store(band);            
        }else{
            this.props.modal();
            fetch(`http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=${band}&api_key=0c05709ba56254b354388302bb35460b&format=json`)
            .then((result) => {
                return result.json();
            }).then((band) => {
                let max = band.similarartists.artist.length;
                let rand = Math.floor(Math.random() * max) + 1 ;
                let artist = band.similarartists.artist[rand];
                return artist;
            }).then((artist) => {
                let img = artist.image[5]['#text'];
                this.setState({
                name: artist.name,
                image: img,
                link: artist.url,
                })
            })
        }
    }

    remove = (band) => {
        console.log(band)
        let filteredArray = this.state.historico.filter(item => item !== band)
        console.log(filteredArray);
        this.setState({historico: filteredArray});
        localStorage.removeItem(JSON.parse(band));
        console.log(this.state.historico);
    }

    renderBand(){
        if(this.state.name !== ''){
            return (
                <div className="bands">
                    <h2>{this.state.name}</h2>
                    <a href={this.state.link}>{this.state.link}</a>
                    <img src={this.state.image} alt=""/>
                </div>
            );
        }else {
            return <p>Digite uma banda!</p>
        }
    }

    renderHistory = () => {
        if(this.props.showModal){
            return (
                <div className="container">
                    <div className="box">
                        <Menu 
                            historico={this.state.historico} 
                            callApi={() => this.callApi()}
                            remove={this.remove}
                        />
                    </div>
                </div>
            );
        }else{
            return (
                <div className="band">
                    <input type="text" value={this.state.band} onChange={e => this.setState({band: e.target.value})} />
                    <br /><br />
                    <Button onClick={() => this.callApi(this.state.band)} >Busca</Button>
                    <br /><br /><br />
                    
                    {this.renderBand()}                

                    <br /><br />
                </div>
            );
        }
    }

    render() {
        return(
            <div>
                {this.renderHistory()}
            </div>
        );
    }
}

export default Band;