import React, { Component } from "react";
import ModalTemplate from "./ModalTemplate";
export default class AddVideo extends Component {
  render() {
    return (
      <ModalTemplate active={true} title="Add Targeted Video" reset={this.props.reset}>
        {"Hello sup"}
      </ModalTemplate>
    );
  }
}
