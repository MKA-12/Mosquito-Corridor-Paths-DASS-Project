import React, { Component } from "react";
import ModalTemplate from "./ModalTemplate";
import html2canvas from "html2canvas";
export default class ExportMap extends Component {
  state = {
    img: "",
  };
  componentDidMount() {
    html2canvas(document.getElementById("map")).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      this.setState({ img: imgData });
    });
  }
  render() {
    return (
      <ModalTemplate
        active={true}
        title="Export Map"
        reset={this.props.reset}
        showSubmit={false}
      >
        <a href={this.state.img} download="map.png" style={{ color: "white" }}>
          <button className="btn btn-primary">Download Map </button>
        </a>
      </ModalTemplate>
    );
  }
}
