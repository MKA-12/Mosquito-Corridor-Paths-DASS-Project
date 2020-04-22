import React, { Component } from "react";
import { Modal, Button, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { MdClose } from "react-icons/md";
export default class ModalTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: this.props.active,
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
        style={{
          backgroundColor: "black",
          borderRadius: 50,
          cursor: "pointer",
          fontSize: 30,
        }}
      />
    );
    return (
      <div>
        <Modal
          isOpen={this.state.active}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader
            toggle={this.toggle}
            close={closeButton}
            style={{ backgroundColor: "black", color: "white" }}
          >
            {this.props.title}
          </ModalHeader>
          <ModalBody
            style={{
              "max-height": "calc(100vh - 210px)",
              "overflow-y": "auto",
            }}
          >
            {this.props.children}
          </ModalBody>
          {this.props.showSubmit !== false ? (
            <ModalFooter>
              <Button color="primary" onClick={this.props.onSubmit}>
                Submit
              </Button>
            </ModalFooter>
          ) : null}
        </Modal>
      </div>
    );
  }
}
