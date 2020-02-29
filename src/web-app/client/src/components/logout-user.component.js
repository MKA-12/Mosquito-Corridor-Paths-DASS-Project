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
            <button type="submit" onClick={this.onClick} className="btn btn-primary">Log Out</button>
        );
    }
}