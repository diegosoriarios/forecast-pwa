import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHistory, faTimesCircle } from '@fortawesome/free-solid-svg-icons'

library.add(faHistory, faTimesCircle)

class Header extends Component {
    showHistory = () => {
        this.props.modal();
    }

    render(){
        const Name = !this.props.offline ? "Online" : "Offline"
        const icon = !this.props.showHistory ? "history" : "times-circle"
        return(
            <div className="header">
                <h1>{Name}</h1>
                <h4 
                    className="menu-history">
                    <FontAwesomeIcon icon={icon}
                    onClick={this.showHistory}
                />
                </h4>
            </div>
        );
    }
}

export default Header;