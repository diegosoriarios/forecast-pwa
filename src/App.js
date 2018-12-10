import React, { Component } from 'react';
import { NumericTextBox } from '@progress/kendo-react-inputs';
import { Button } from "@progress/kendo-react-buttons";
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
      <div className="app">
        <Header />
        <Band />
      </div>
    );
  }
}

export default App;
