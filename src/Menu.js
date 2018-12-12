import React, { Component } from 'react';

class Menu extends Component{
    onHandlerClick = (band) => {
        this.props.remove(band.item);
        this.props.callApi(band.item);
    }

    render(){
        const item = this.props.historico.map((item, i) => {
            return <li key={i} onClick={() => this.onHandlerClick({item})}>{item}</li>
        })
        
        return(
            <div className="historico">
                <div className="box-historico">
                    <h1>Histórico</h1>
                    <ul>
                        {item}
                    </ul>
                </div>
            </div>
        );
    }
}

export default Menu;