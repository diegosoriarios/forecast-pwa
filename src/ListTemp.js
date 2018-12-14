import React, { Component } from 'react';
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faCloudRain, faCloudShowersHeavy, faCloud, faCloudSun } from '@fortawesome/free-solid-svg-icons'

library.add(faSun, faCloudRain, faCloudShowersHeavy, faCloud, faCloudSun)

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
                    switch(item){
                        case "céu claro":
                            item = <p>Céu claro <FontAwesomeIcon icon="sun" color="yellow" /></p>
                            break;
                        case "chuva fraca":
                            item = <p>Chuva Fraca <FontAwesomeIcon icon="cloud-rain" color="white" /></p>
                            break;
                        case "chuva moderada":
                            item = <p>Chuva Moderada <FontAwesomeIcon icon="cloud-showers-heavy" color="white" /></p>
                            break;
                        case "chuva de intensidade pesado":
                            item = <p>Chuva Pesada <FontAwesomeIcon icon="cloud-showers-heavy" color="black" /></p>
                            break;
                        case "tempo nublado":
                            item = <p>Nublado <FontAwesomeIcon icon="cloud" color="grey" /></p>
                            break;
                        case "nuvens quebrados":
                            item = <p>Sol entre Nuvens <FontAwesomeIcon icon="cloud-sun" color="lightyellow" /></p>
                            break;
                        case "algumas nuvens":
                            item = <p>Algumas nuvens <FontAwesomeIcon icon="cloud" color="lightyellow" /></p>
                            break;
                        default:
                            item = <p>{item}</p>;
                    }
                    if(index === 2){
                        let data = item.props.children.split(" ");
                        data = data[0].split("-");
                        item = `${data[2]}/${data[1]}/${data[0]}`
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