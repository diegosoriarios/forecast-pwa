import React, { Component } from 'react';
import './App.css';
import '@progress/kendo-theme-default/dist/all.css';
import Band from './Band';
import Header from './Header';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      offline: false,
      showHistory: false
    }
  }

  componentDidMount(){
    window.addEventListener('online', () => {
      this.setState({offline: false});
    });

    window.addEventListener('offline', () => {
      this.setState({offline: true});
    });
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

  render() {
    return (
      <div className="App">
        <Header 
          offline={this.state.offline} 
          modal={this.showHideModal} 
          showHistory={this.state.showHistory}
        />
        <Band 
          offline={this.state.offline} 
          showModal={this.state.showHistory}
          modal={this.showHideModal}
        />
      </div>
    );
  }
}

export default App;
