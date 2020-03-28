import React, { Component } from "react";
export default class LogoutUser extends Component{
    constructor(props){
        super(props);
    }
    onClick(){
        console.log("clear");
        sessionStorage.clear();
        window.location.reload();
    }
    render(){
        return(
            // <button type="submit" onClick={this.onClick}>Log Out</button>
            <a onClick={this.onClick}>
                  <i class="fa fa-power-off fa-2x"></i>
                  <span class="nav-text">Logout</span>
                </a>
        );
    }
}