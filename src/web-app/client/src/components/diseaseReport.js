import React, { Component } from "react";
import axios from "axios";
import { Modal, Button, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { MdClose } from "react-icons/md";
export default class DiseaseReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDisease: [],
      active: this.props.active
    };
  }
  toggle = () => {
    this.setState({ active: !this.state.active });
    setTimeout(() => {
      this.props.reset();
    }, 1000);
  };
  componentDidUpdate() {
    axios
      .get("http://localhost:4000/api/diseaseReport")
      .then(res => {
        this.setState({ allDisease: res.data });
        // console.log(this.state.allDisease)
      })
      .catch(err => {
        console.log(err);
      });
  }
  componentDidMount() {
    axios
      .get("http://localhost:4000/api/diseaseReport")
      .then(res => {
        this.setState({ allDisease: res.data });
        // console.log(this.state.allDisease)
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    const closeButton = (
      <MdClose
        onClick={this.toggle}
        style={{ backgroundColor: "red", borderRadius: 50, cursor: "pointer" }}
      />
    );
    return (
      <React.Fragment>
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
            Disease Reports
          </ModalHeader>
          <ModalBody>
            <table className="table table-striped">
              <thead class="thead-dark">
                <tr>
                  <th>Disease</th>
                  <th>Location</th>
                </tr>
              </thead>
              <tbody>
                {this.state.allDisease.map((curr, i) => {
                  return (
                    <tr>
                      <td>{curr.diseaseName}</td>
                      <td>{curr.area}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}
