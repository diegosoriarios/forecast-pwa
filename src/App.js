import React, { Component } from 'react';
import './App.css';
import '@progress/kendo-theme-default/dist/all.css';
import ListTemp from './ListTemp';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      city: '',
      country: '',
      temperaturas: [],
      offline: false,
      history: []
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
    for(var i = 0; i < localStorage.length; i++){
      cached = cached.concat([JSON.parse(localStorage.getItem(localStorage.key(i)))]);
    }
    this.setState({
      history: cached,
    })
  }

  componentDidUpdate() {
    let offlineStatus = !navigator.onLine;
    if(this.state.offline !== offlineStatus){
      this.setState({offline: offlineStatus});
    }
  }

  showHideModal = () => {
    this.setState({
      showHistory: !this.state.showHistory
    })
  }

  callApi(city, country){
    if(!this.state.offline){
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
              ])
            }, () => {
              console.log(this.state.temperaturas)
              this.state.temperaturas.forEach((item, i) => {
                localStorage.setItem(i, JSON.stringify(item))
              })
            })
          }
        })
      })
    }
  }


  renderDiv(){
    if(!this.state.offline){
        return (
          <div className="App">
          <input 
            type="text" 
            value={this.state.city}
            onChange={e => this.setState({city: e.target.value})}
          />
          <input
            type="text"
            value={this.state.country}
            onChange={e => this.setState({country: e.target.value})}
          />
          <button onClick={() => this.callApi(this.state.city, this.state.country)}>Busca</button>
          {this.state.temperaturas}
        </div>
        );
    }else{
      return (
        <div className="App">
          <h2 align="center">Você está offline</h2>
          <ListTemp temp={this.state.history} />
        </div>
      );
    }
  }

  render() {
    let status = this.state.offline ? <h1>Offline</h1> : <h1>Online</h1>
    return (
      <div className="App">
        {status}<br />
        {this.renderDiv()}
      </div>
    );
  }
}

export default App;