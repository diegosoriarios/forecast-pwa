import React, { Component } from 'react';
import './App.css';

class ListTemp extends Component {
    constructor(props){
        super(props);
        this.state = {
            check: false,
        }
    }

    renderTemp = () => {
        return this.props.temp.map((i, index) => {
            return (
                <ul key={index} className="temp-box">{
                i.map((item) => {
                    return <li className="itens">{item} </li>
                })
            }</ul>
            );
        })
    }

    render(){
        return(
            <div className="temp-container">
                {this.renderTemp()}
            </div>
        );
    }
}

export default ListTemp;