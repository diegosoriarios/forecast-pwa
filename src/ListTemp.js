import React, { Component } from 'react';
import { timingSafeEqual } from 'crypto';

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
                <li key={index}>{
                i.map((item) => {
                    return <span>{item} </span>
                })
            }</li>
            );
        })
    }

    render(){
        return(
            <ul>
                {this.renderTemp()}
            </ul>
        );
    }
}

export default ListTemp;