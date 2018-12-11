import React, { Component } from 'react';
import './App.css';
import { Button } from "@progress/kendo-react-buttons";

class Band extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            image: '',
            link: '',
            band: ''
        }
    }

    callApi(band){
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
            </div>
        )
    }
}

export default Band;