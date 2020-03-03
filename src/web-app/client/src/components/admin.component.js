import React, { Component } from "react";
import { NavbarBrand, Navbar } from "reactstrap";
import LogoutUser from "./logout-user.component";
import backpic from "../images/maxresdefault.jpg"
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
  componentDidMount() {
    document.body.style.background = `url(${backpic})`
  }
  render() {
    return (
      <div >
        <React.Fragment >
          <Navbar
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
          <br /><br/><br/>
          <React.Fragment>

            <nav class="navbar navbar-light bg-light">
              <form class="form-inline">
                <button class={this.state.button1} type="button" onClick={this.buttonOne}>Home</button>
                <a class={this.state.button2} type="button" href="http://localhost:4000/static/index.html" target="_bl">Map View</a>
                <button class={this.state.button3} type="button" onClick={this.buttonThree}>Disease Report</button>
                <button class={this.state.button4} type="button" onClick={this.buttonFour}>Sensor Maintainace</button>
                <button class={this.state.button5} type="button" onClick={this.buttonFive}>Add New </button>
              </form>
              Welcome {JSON.parse(window.sessionStorage.getItem("User")).name}
            </nav>
            {
              this.state.active == 4
                ?
                <div>
                  <SensorMaintainence />
                  <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />
                </div>
                : this.state.active == 3
                  ?
                  <div>
                    <DiseaseReport />
                    <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />
                  </div>
                  :
                  <div style={{ backgroundImage: "url(http://www.mosquito-awareness.com/images/newimages/Header.png)", width: "100%", backgroundPosition: "center" }}>
                    <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />
                  </div>
            }

          </React.Fragment>
        </React.Fragment>
      </div>
    );
  }
}
