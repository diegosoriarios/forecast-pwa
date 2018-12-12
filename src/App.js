import React, { Component } from 'react';
import { NumericTextBox } from '@progress/kendo-react-inputs';
import './App.css';
import '@progress/kendo-theme-default/dist/all.css';
import Band from './Band';
import Header from './Header';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      offline: false
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

  componentDidUpdate(){
    let offlineStatus = !navigator.online;
    if(this.state.offline !== offlineStatus){
      this.setState({offline: offlineStatus});
    }
  }

  render() {
    return (
      <div className="App">
        <Header offline={this.state.offline}/>
        <Band offline={this.state.offline}/>
      </div>
    );
  }
}

export default App;
