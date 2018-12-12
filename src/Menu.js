import React, { Component } from 'react';

class Menu extends Component{
    onHandlerClick = (band, i) => {
        this.props.remove(band.item, i);
        this.props.callApi(band.item);
    }

    render(){
        const item = this.props.historico.map((item, i) => {
            return <li key={i} onClick={() => this.onHandlerClick({item, i})}>{item}</li>
        })
        return(
            <ul>
                {item}
            </ul>
        );
    }
}

export default Menu;