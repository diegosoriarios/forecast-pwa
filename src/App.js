import React, { Component } from 'react';
import './App.css';
import '@progress/kendo-theme-default/dist/all.css';
import ListTemp from './ListTemp';
import Modal from './Modal';
import Footer from './Footer';
import { CountryDropdown } from 'react-country-region-selector';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      city: '',
      country: '',
      temperaturas: [],
      offline: false,
      history: [],
      showModal: false,
      msg: '',
      place: ''
    }
  }

  componentDidMount(){
    window.addEventListener('online', () => {
      this.setState({offline: false});
    });

    window.addEventListener('offline', () => {
      this.setState({offline: true});
    });

    let cached = [];
    let lugar = '';
    for(var i = 0; i < localStorage.length; i++){
      if(localStorage.key(i) === 'place'){
        lugar = JSON.parse(localStorage.getItem(localStorage.key(i)));
      }else{
        cached = cached.concat([JSON.parse(localStorage.getItem(localStorage.key(i)))]);
      }
    }
    this.setState({
      history: cached,
      place: lugar
    })
  }

  componentDidUpdate() {
    let offlineStatus = !navigator.onLine;
    if(this.state.offline !== offlineStatus){
      this.setState({offline: offlineStatus});
    }
  }

  callApi(city, country){
    city = city.replace(/\b\w/g, l => l.toUpperCase())
    this.setState({
      temperaturas: []
    })
    if(city.length > 0 && country.length > 0){
      fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&lang=pt&units=metric&mode=json&appid=5325907441644570670df6cdec3acd5a`)
      .then((result) => {
        return result.json();
      }).then((dados) => {
        let len = dados.list.length;
        dados.list.forEach((dado, i) => {
          if(i % Math.ceil(len / 5) === 0){
            this.setState({
              temperaturas: this.state.temperaturas.concat([
                  [dado.main.temp,
                  dado.weather[0].description,
                  dado.dt_txt] 
              ]),
              place: city
            }, () => {
              localStorage.clear();
              localStorage.setItem('place', JSON.stringify(city));
              this.state.temperaturas.forEach((item, i) => {
                localStorage.setItem(i, JSON.stringify(item))
              })
              this.setState({history: this.state.temperaturas})
            })
          }
        })
      }).catch(err => {
        this.setState({msg: "Cidade não encontada", showModal: true})
      })
    }else{
      this.setState({msg: "Valores inválidos", showModal: true})
    }
  }

  closeModal = () => {
    this.setState({showModal: false});
  }

  selectCountry = val => {
    this.setState({ country: val });
  }

  renderDiv(){
    if(this.state.showModal){
      return <Modal title={this.state.msg} show={this.closeModal} />
    }else{
      if(!this.state.offline){
          return (
            <div className="App">
              <div className="Header">
                <label>
                  <span>Cidade:</span>
                  <input
                    placeholder="Cidade"
                    className="input_city" 
                    type="text"
                    value={this.state.city}
                    onChange={e => this.setState({city: e.target.value})}
                  />
                </label>
                <label>
                  <span>País:</span>
                  <CountryDropdown
                    className="input_country"
                    defaultOptionLabel="País"
                    value={this.state.country}
                    labelType="short"
                    valueType="short"
                    onChange={(val) => this.selectCountry(val)}
                    priorityOptions={["BR", "US", "UY"]}
                  />
                </label>
                <br />
                <button className="btn-search" onClick={() => this.callApi(this.state.city, this.state.country)}>Busca</button>
                <ListTemp temp={this.state.temperaturas} />
              </div>        
            </div>
          );
      }else{
        return (
          <div className="App">
            <h2 className="place">{this.state.place}</h2>
            <ListTemp temp={this.state.history} />
          </div>
        );
      }
    }
  }

  render() {
    return (
      <div className="App">
        <h1>Forecast</h1><br />
        {this.renderDiv()}
        <Footer />
      </div>
    );
  }
}

export default App;