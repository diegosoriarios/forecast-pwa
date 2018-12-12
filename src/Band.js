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
        const cached = localStorage.getItem("item");
        const values = JSON.parse(cached);
        this.setState({
            historico: this.state.historico.concat(values)
        })
    }

    store = (band) => {
        this.setState({
            historico: this.state.historico.concat(band)
        }, () => {
            var items = this.state.historico;
            localStorage.setItem(band, JSON.stringify(items));
            console.log(this.state.historico);
        });
    }

    callApi(band){
        if(this.props.offline){
            console.log("Você está offline");
            this.store(band);            
        }else{
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

    remove = (band, i) => {
        console.log(band)
        let filteredArray = this.state.historico.filter(item => item !== band)
        console.log(filteredArray);
        this.setState({historico: filteredArray});
        localStorage.removeItem(localStorage.getItem(i))
        console.log(this.state.historico);
    }

    renderBand(){
        if(this.state.name != ''){
            return (
                <div className="bands">
                    <h2>{this.state.name}</h2>
                    <a href={this.state.link}>{this.state.link}</a>
                    <img src={this.state.image} alt="image"/>
                </div>
            );
        }else {
            return <p>Digite uma banda!</p>
        }
    }

    render() {
        return(
            <div className="band">
                <input type="text" value={this.state.band} onChange={e => this.setState({band: e.target.value})} />
                <br /><br />
                <Button onClick={() => this.callApi(this.state.band)} >Busca</Button>
                <br /><br /><br />
                
                {this.renderBand()}                

                <br /><br />
                <Menu 
                    historico={this.state.historico} 
                    callApi={() => this.callApi()}
                    remove={this.remove}
                />
            </div>
        )
    }
}

export default Band;