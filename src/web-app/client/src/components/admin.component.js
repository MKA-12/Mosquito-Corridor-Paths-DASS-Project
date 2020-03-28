import React, { Component, useState } from "react";
import {
  NavbarBrand,
  Navbar,
  Modal,
  Button,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
import { Route } from "react-router-dom";
import LogoutUser from "./logout-user.component";
import backpic from "../images/maxresdefault.jpg";
import ConfigData from "../config";
import SensorMaintainence from "./sensorMaintainence";
import ExportData from "./exportData";
import DiseaseReport from "./diseaseReport";
import MapComponent from "./map.component";
import LogicBuilder from "./logic-builder";
import AddVideo from "./targeted-video";
import AddMessage from "./targeted-message";
import NewMonitor from "./register-new-monitor";
import ExportMap from "./exportMap";
import "./admin.component.css";
import {
  FaBroadcastTower,
  FaDizzy,
  FaMapMarkedAlt,
  FaTools,
  FaDownload
} from "react-icons/fa";
import { TiExport } from "react-icons/ti";
import {
  MdVideoLibrary,
  MdMessage,
  MdPersonAdd,
  MdFileDownload,
  MdAddAPhoto,
  MdVideoCall,
  MdReportProblem
} from "react-icons/md";
import { AiOutlineDatabase, AiFillDatabase } from "react-icons/ai";
export default class AdminComponent extends Component {
  constructor(props) {
    super(props);
    this.reset = this.reset.bind(this);
  }
  state = {
    active: 0
  };
  buttonOne = () => {
    this.setState({
      active: 1
    });
  };
  buttonTwo = () => {
    this.setState({
      active: 2
    });
  };
  buttonThree = () => {
    this.setState({
      active: 3
    });
  };
  buttonFour = () => {
    this.setState({
      active: 4
    });
  };
  buttonFive = () => {
    this.setState({
      active: 5
    });
  };
  buttonSix = () => {
    this.setState({
      active: 6
    });
  };
  buttonSeven = () => {
    this.setState({
      active: 7
    });
  };
  reset() {
    this.setState({ active: 0 });
  }
  render() {
    return (
      <div>
        <React.Fragment>
          <div class="area"></div>
          <nav class="main-menu" style={{ backgroundColor: "black" }}>
            <ul>
              <li>
                <a href="/admin/">
                  <i class="fa">
                    <FaMapMarkedAlt />
                  </i>
                  <span class="nav-text">Map</span>
                </a>
              </li>
              <li>
                <a href="/admin/SensorManagement">
                  <i class="fa ">
                    <FaBroadcastTower />
                  </i>
                  <span class="nav-text">Sensor Management</span>
                </a>
              </li>
              <li>
                <a
                  onClick={() => {
                    this.buttonOne();
                  }}
                >
                  <i class="fa">
                    <FaDownload />
                  </i>
                  <span class="nav-text">Export Data</span>
                </a>
              </li>
              <li>
                <a
                  onClick={() => {
                    this.buttonTwo();
                  }}
                >
                  <i class="fa">
                    <MdAddAPhoto />
                  </i>
                  <span class="nav-text">Add Targeted Video</span>
                </a>
              </li>
              <li>
                <a
                  onClick={() => {
                    this.buttonThree();
                  }}
                >
                  <i class="fa">
                    <MdMessage />
                  </i>
                  <span class="nav-text">Add Targeted Message</span>
                </a>
              </li>
              <li>
                <a
                  onClick={() => {
                    this.buttonFour();
                  }}
                >
                  <i class="fa">
                    <FaTools />
                  </i>
                  <span class="nav-text">Logic Builder</span>
                </a>
              </li>
              <li>
                <a
                  onClick={() => {
                    this.buttonFive();
                  }}
                >
                  <i class="fa">
                    <MdPersonAdd />
                  </i>
                  <span class="nav-text">Register New Monitor</span>
                </a>
              </li>
              <li class="has-subnav">
                <a
                  onClick={() => {
                    this.buttonSix();
                  }}
                >
                  <i class="fa">
                    <MdReportProblem />
                  </i>
                  <span class="nav-text">Disease Report View</span>
                </a>
              </li>
              <li class="has-subnav">
                <a
                  onClick={() => {
                    this.buttonSeven();
                  }}
                >
                  <i class="fa">
                    <TiExport />
                  </i>
                  <span class="nav-text">Export Map</span>
                </a>
              </li>
            </ul>
            <ul class="logout">
              <li>
                <a href="#">
                  <i class="fa fa-lock fa-2x"></i>
                  <span class="nav-text">Change Password</span>
                </a>
              </li>
              <li>
                <LogoutUser/>
              </li>
            </ul>
          </nav>
          {/* <Navbar
            inverse
            className="fixed-top collapseOnSelect nav-bar"
            // color="dark"
            // sticky
            style={{
              // backgroundColor: "black"
              // marginLeft: 65
            }}
            // dark
            light
          >
            <NavbarBrand>
              Mosquito Corridor Detection and Visualization System
            </NavbarBrand>
            <NavbarBrand>
              <LogoutUser />
            </NavbarBrand>
          </Navbar> */}
          <div style={{ marginTop: 100 }}>
            <Route
              path="/admin/SensorManagement"
              exact
              component={SensorMaintainence}
            />
            <Route path="/admin/" exact component={MapComponent} />
          </div>
          {this.state.active == 1 ? (
            <div>
              <ExportData active={true} reset={this.reset} />
            </div>
          ) : null}
          {this.state.active == 2 ? (
            <AddVideo active={true} reset={this.reset} />
          ) : null}
          {this.state.active == 3 ? (
            <AddMessage active={true} reset={this.reset} />
          ) : null}
          {this.state.active == 4 ? (
            <LogicBuilder active={true} reset={this.reset} />
          ) : null}
          {this.state.active == 5 ? (
            <NewMonitor active={true} reset={this.reset} />
          ) : null}
          {this.state.active == 6 ? (
            <DiseaseReport active={true} reset={this.reset} />
          ) : null}
          {this.state.active == 7 ? (
            <ExportMap active={true} reset={this.reset} />
          ) : null}
        </React.Fragment>
      </div>
    );
  }
}
