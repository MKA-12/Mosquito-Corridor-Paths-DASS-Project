import React, { Component } from "react";
// import { Link, Route } from "react-router-dom";
import { NavbarBrand, Navbar } from "reactstrap";
import LogoutUser from "./logout-user.component";
import DiseaseReport from "./diseaseReport";
export default class MonitorComponent extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    active: 1,
    button1: 'btn btn-outline-success',
    button2: 'btn btn-sm btn-outline-secondary',
    button3: 'btn btn-sm btn-outline-secondary',
    button4: 'btn btn-sm btn-outline-secondary',
    button5: 'btn btn-sm btn-outline-secondary',
  }
  buttonOne = () => {
    this.setState({
      active: 1,
      button1: 'btn btn-outline-success',
      button2: 'btn btn-sm btn-outline-secondary',
      button3: 'btn btn-sm btn-outline-secondary',
      button4: 'btn btn-sm btn-outline-secondary',
      button5: 'btn btn-sm btn-outline-secondary',
    })
  }
  buttonTwo = () => {
    this.setState({
      button2: 'btn btn-sm btn-outline-secondary'
    })
  }
  buttonThree = () => {
    this.setState({
      active: 3,
      button3: 'btn btn-outline-success',
      button2: 'btn btn-sm btn-outline-secondary',
      button1: 'btn btn-sm btn-outline-secondary',
      button4: 'btn btn-sm btn-outline-secondary',
      button5: 'btn btn-sm btn-outline-secondary',
    })
  }
  render() {
    return (
      <div>
        <Navbar
          style={{ marginBottom: "0" }}
          inverse
          className="fixed-top collapseOnSelect nav-bar"
          color="dark"
          dark
        >
          <NavbarBrand>Mosquito Corridor Detection and Visualization System</NavbarBrand>
          <NavbarBrand>
            <LogoutUser />
          </NavbarBrand>
        </Navbar>
        <br />
        <br />
        <br />
        <React.Fragment>

          <nav class="navbar navbar-light bg-light">
            <form class="form-inline">
              <button class={this.state.button1} type="button" onClick={this.buttonOne}>Home</button>
              <a class={this.state.button2} type="button" href="http://localhost:4000/static/index.html" target="_bl">Map View</a>
              <button class={this.state.button3} type="button" onClick={this.buttonThree}>Disease Report</button>
            </form>
          </nav>
          {
            this.state.active == 3
              ? <DiseaseReport />
              : null

          }
        </React.Fragment>
      </div>
    );
  }
}
