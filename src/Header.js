import React, { Component } from 'react';

class Header extends Component {
    render(){
        const Name = !this.props.offline ? "Online" : "Offline"
        return(
            <div className="header">
                <h1>{Name}</h1>
            </div>
        );
    }
}

export default Header;