import React, { Component } from "react";
import { Route } from "react-router-dom";
import LogoutUser from "./logout-user.component";
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
import ChangePassword from "./change-password";
import {Redirect} from "react-router-dom"
import "./admin.component.css";
import {
  FaBroadcastTower,
  FaMapMarkedAlt,
  FaTools,
  FaDownload,
} from "react-icons/fa";
import { TiExport } from "react-icons/ti";
import {
  MdMessage,
  MdPersonAdd,
  MdAddAPhoto,
  MdReportProblem,
} from "react-icons/md";
export default class AdminComponent extends Component {
  constructor(props) {
    super(props);
    this.reset = this.reset.bind(this);
  }
  state = {
    active: 0,
  };
  changeStatus = (status) => {
    this.setState({
      active: status,
    });
  };
  reset() {
    this.setState({ active: 0 });
  }
  render() {
    return (
      <React.Fragment>
        {(JSON.parse(window.sessionStorage.getItem("User")!==null))?(JSON.parse(window.sessionStorage.getItem("User")).type === "monitor")?<Redirect to="/monitor/" />:null:null}
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
                  this.changeStatus(1);
                }}
              >
                <i class="fa">
                  <FaDownload />
                </i>
                <span class="nav-text">Export Weather Data</span>
              </a>
            </li>
            <li>
              <a
                onClick={() => {
                  this.changeStatus(2);
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
                  this.changeStatus(3);
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
                  this.changeStatus(4);
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
                  this.changeStatus(5);
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
                  this.changeStatus(6);
                }}
              >
                <i class="fa">
                  <MdReportProblem />
                </i>
                <span class="nav-text">Disease Report View</span>
              </a>
            </li>
            {window.location.pathname === "/admin/" ? (
              <li class="has-subnav">
                <a
                  onClick={() => {
                    this.changeStatus(7);
                  }}
                >
                  <i class="fa">
                    <TiExport />
                  </i>
                  <span class="nav-text">Export Map</span>
                </a>
              </li>
            ) : null}
          </ul>
          <ul class="logout">
            <li>
              <a
                onClick={() => {
                  this.changeStatus(8);
                }}
              >
                <i class="fa fa-lock fa-2x"></i>
                <span class="nav-text">Change Password</span>
              </a>
            </li>
            <li>
              <LogoutUser />
            </li>
          </ul>
        </nav>
        <div style={{ marginTop: 100 }}>
          <Route
            path="/admin/SensorManagement"
            exact
            component={SensorMaintainence}
          />
          <Route path="/admin/" exact component={MapComponent} />
        </div>
        {this.state.active == 1 ? <ExportData reset={this.reset} /> : null}
        {this.state.active == 2 ? <AddVideo reset={this.reset} /> : null}
        {this.state.active == 3 ? <AddMessage reset={this.reset} /> : null}
        {this.state.active == 4 ? <LogicBuilder reset={this.reset} /> : null}
        {this.state.active == 5 ? <NewMonitor reset={this.reset} /> : null}
        {this.state.active == 6 ? <DiseaseReport reset={this.reset} /> : null}
        {this.state.active == 7 ? <ExportMap reset={this.reset} /> : null}
        {this.state.active == 8 ? <ChangePassword reset={this.reset} /> : null}
      </React.Fragment>
    );
  }
}
