import React, { Component } from "react";
import { Modal, Button, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { MdClose } from "react-icons/md";
import  SensorMaintainance  from "./sensorMaintainence";
export default class ExportMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: this.props.active
    };
  }
  toggle = () => {
    this.setState({ active: !this.state.active });
    setTimeout(() => {
      this.props.reset();
    }, 1000);
  };

  render() {
    const closeButton = (
      <MdClose
        onClick={this.toggle}
        style={{ backgroundColor: "red", borderRadius: 50, cursor: "pointer" }}
      />
    );
    return (
      <div>
        <Modal
          isOpen={this.state.active}
          toggle={this.toggle}
          className={this.props.className}
          size="lg"
        >
          <ModalHeader
            toggle={this.toggle}
            close={closeButton}
            style={{ backgroundColor: "black", color: "white" }}
          >
            Export Map
          </ModalHeader>
          <ModalBody>
            {/* Insert Code Here */}
            <SensorMaintainance />
          </ModalBody>
          <ModalFooter>
            <Button color="primary">Submit</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
