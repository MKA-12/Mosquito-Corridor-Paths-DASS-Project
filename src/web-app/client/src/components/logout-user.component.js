import React, { Component } from "react";
export default class LogoutUser extends Component {
  onClick() {
    sessionStorage.clear();
    window.location.reload();
  }
  render() {
    return (
      <a onClick={this.onClick}>
        <i className="fa fa-power-off fa-2x"></i>
        <span className="nav-text">Logout</span>
      </a>
    );
  }
}
