import React, { Component } from "react";
import ModalTemplate from "./ModalTemplate";
export default class ChangePassword extends Component {
  render() {
    return (
      <ModalTemplate active={true} title="Change Your Password" reset={this.props.reset}>
        {"Hello sup"}
      </ModalTemplate>
    );
  }
}
