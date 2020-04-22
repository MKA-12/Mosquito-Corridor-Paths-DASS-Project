import React, { Component } from "react";
// import { Link, Route } from "react-router-dom";
import { NavbarBrand, Navbar, Button } from "reactstrap";
import LogoutUser from "./logout-user.component";
import DiseaseReport from "./diseaseReport";
import ExportData from "./exportData";
import MapComponent from "./map.component";
import ExportMap from "./exportMap";
import ChangePassword from "./change-password";
import { TiExport } from "react-icons/ti";
import { MdReportProblem } from "react-icons/md";
import { FaDownload } from "react-icons/fa";
export default class MonitorComponent extends Component {
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
        <div class="area"></div>
        <nav class="main-menu" style={{ backgroundColor: "black" }}>
          <ul>
            <li>
              <a
                onClick={() => {
                  this.changeStatus(1);
                }}
              >
                <i class="fa">
                  <FaDownload />
                </i>
                <span class="nav-text">Export Data</span>
              </a>
            </li>
            <li class="has-subnav">
              <a
                onClick={() => {
                  this.changeStatus(2);
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
                  this.changeStatus(3);
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
              <a
                onClick={() => {
                  this.changeStatus(4);
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
        <MapComponent />
        {this.state.active == 1 ? <ExportData reset={this.reset} /> : null}
        {this.state.active == 2 ? <DiseaseReport reset={this.reset} /> : null}
        {this.state.active == 3 ? <ExportMap reset={this.reset} /> : null}
        {this.state.active == 4 ? <ChangePassword reset={this.reset} /> : null}
      </React.Fragment>
    );
  }
}
