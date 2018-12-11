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
    }
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Band />
      </div>
    );
  }
}

export default App;
