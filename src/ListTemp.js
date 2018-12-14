import React, { Component } from 'react';
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faCloudRain, faCloudShowersHeavy } from '@fortawesome/free-solid-svg-icons'

library.add(faSun, faCloudRain, faCloudShowersHeavy)

class ListTemp extends Component {
    constructor(props){
        super(props);
        this.state = {
            check: false,
        }
    }

    renderTemp = () => {
        return this.props.temp.map((i, ind) => {
            return (
                <ul key={ind} className="temp-box">{
                i.map((item, index) => {
                    if(item === "céu claro"){
                        item = <p>Céu claro <FontAwesomeIcon icon="sun" color="yellow" /></p>
                    }else{
                        if(item === "chuva fraca"){
                            item = <p>Chuva Fraca <FontAwesomeIcon icon="cloud-rain" color="white" /></p>
                        }else{
                            if(item === "chuva moderada"){
                                item = <p>Chuva Moderada <FontAwesomeIcon icon="cloud-showers-heavy" color="white" /></p>
                            }else{
                                if(item === "chuva de intensidade pesado"){
                                    item = <p>Chuva Pesada <FontAwesomeIcon icon="cloud-showers-heavy" color="black" /></p>
                                }
                            }
                        }
                    }
                    return <li className="itens" key={index}>{item} </li>
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