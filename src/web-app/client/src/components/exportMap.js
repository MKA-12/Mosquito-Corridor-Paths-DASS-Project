import React, { Component } from "react";
import ModalTemplate from "./ModalTemplate";
export default class ExportMap extends Component {
  render() {
    return (
      <ModalTemplate active={true} title="Export Map" reset={this.props.reset}>
        {"Hello sup"}
      </ModalTemplate>
    );
  }
}
