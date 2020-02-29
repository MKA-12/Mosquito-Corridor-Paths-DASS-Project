import React, { Component } from "react";
import { NavbarBrand, Navbar } from "reactstrap";
import LogoutUser from "./logout-user.component";

import ConfigData from "../config"
import SensorMaintainence from "./sensorMaintainence";
import DiseaseReport from "./diseaseReport";

export default class AdminComponent extends Component {
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
      button2:'btn btn-sm btn-outline-secondary'
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
  buttonFour = () => {
    this.setState({
      active: 4,
      button4: 'btn btn-outline-success',
      button2: 'btn btn-sm btn-outline-secondary',
      button3: 'btn btn-sm btn-outline-secondary',
      button1: 'btn btn-sm btn-outline-secondary',
      button5: 'btn btn-sm btn-outline-secondary',
    })
  }
  buttonFive = () => {
    this.setState({
      active: 5,
      button5: 'btn btn-outline-success',
      button2: 'btn btn-sm btn-outline-secondary',
      button3: 'btn btn-sm btn-outline-secondary',
      button4: 'btn btn-sm btn-outline-secondary',
      button1: 'btn btn-sm btn-outline-secondary',
    })
  }
  render() {
    return (
      <React.Fragment>
        <Navbar
          style={{ marginBottom: "0" }}
          inverse
          className="fixed-top collapseOnSelect nav-bar"
          color="dark"
          dark
        >
          <NavbarBrand>
            Mosquito Corridor Detection and Visualization System
          </NavbarBrand>
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
              <button class={this.state.button4} type="button" onClick={this.buttonFour}>Sensor Maintainace</button>
              <button class={this.state.button5} type="button" onClick={this.buttonFive}>Add New </button>
            </form>
          </nav>
          {
            this.state.active==4
            ?<SensorMaintainence/>
            :this.state.active==3
            ?<DiseaseReport/>
            :null

          }
        </React.Fragment>
      </React.Fragment>
    );
  }
}
