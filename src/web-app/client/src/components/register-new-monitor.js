import React, { Component } from "react";
import ModalTemplate from "./ModalTemplate";
export default class NewMonitor extends Component {
  render() {
    return (
      <ModalTemplate active={true} title="Register New Monitor" reset={this.props.reset}>
        {"Hello sup"}
      </ModalTemplate>
    );
  }
}
