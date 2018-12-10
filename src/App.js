import React, { Component } from 'react';
import { NumericTextBox } from '@progress/kendo-react-inputs';
import { Button } from "@progress/kendo-react-buttons";
import './App.css';
import '@progress/kendo-theme-default/dist/all.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      habitId: 0,
      habitName: '',
      habitIteration: 0,
      habits: []
    }
  }

  handleNameChange = (e) => {
    this.setState({habitName: e.target.value});
  }

  handleInterationChange = (e) => {
    this.setState({habitIteration: e.target.value});
  }

  handleHabit = (e) => {
    this.setState({
      habits: this.state.habits.concat([{
        key: this.state.habitId,
        name: this.state.habitName,
        iteration: this.state.habitIteration
      }]),
      habitId: this.state.habitId + 1
    });
  }

  render() {
    return (
      <div className="App">
        <header className="header">
          <h1>Goals & Interations</h1>  
        </header>
        <div className="habits-list">
          <ul>
            {this.state.habits.map((habit, index) => [
              <li key={index}>
                <p>{habit.name}</p>
                <div className="iterations-area">
                  {[...Array(habit.iterations)].map((iteration, index) => {
                    return <input key={index} type="radio" />
                  })}
                </div>
              </li>
            ])}
          </ul>
        </div>
        <div className="add-habit">
          <label>Goal: </label>
          <input type="text" onChange={this.handleNameChange} />
          <br />
          <br />
          <label>Interation </label>
          <NumericTextBox 
            format='0'
            min={0}
            max={22}
            onChange={this.handleInterationChange} 
          /><br /><br />
          <Button primary={true} onClick={this.handleHabit}>
            ASADASd
          </Button>
        </div>
      </div>
    );
  }
}

export default App;
