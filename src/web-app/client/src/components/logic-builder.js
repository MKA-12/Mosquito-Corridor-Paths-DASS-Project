import React, { Component } from "react";
import ModalTemplate from "./ModalTemplate";
export default class LogicBuilder extends Component {
  render() {
    return (
      <ModalTemplate active={true} title="Logic Builder" reset={this.props.reset}>
        {"Hello sup"}
      </ModalTemplate>
    );
  }
}
