import React, { Component } from "react";
import ModalTemplate from "./ModalTemplate";
export default class AddMessage extends Component {
  render() {
    return (
      <ModalTemplate active={true} title="Add Targeted Message" reset={this.props.reset}>
        {"Hello sup"}
      </ModalTemplate>
    );
  }
}
