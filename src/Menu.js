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
        let titulo;
        if(this.props.historico.length > 0){
            titulo = <h1>Histórico</h1>
        }else{
            titulo = <span />
        }
        
        return(
            <div class="historico">
                {titulo}
                <ul>
                    {item}
                </ul>
            </div>
        );
    }
}

export default Menu;