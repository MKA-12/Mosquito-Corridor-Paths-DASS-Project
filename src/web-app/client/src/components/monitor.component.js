import React, { Component } from "react";
// import { Link, Route } from "react-router-dom";
import LogoutUser from "./logout-user.component";
import DiseaseReport from "./diseaseReport";
import ExportData from "./exportData";
import MapComponent from "./map.component";
import ExportMap from "./exportMap";
import ChangePassword from "./change-password";
import { Redirect } from "react-router-dom";
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
        {JSON.parse(window.sessionStorage.getItem("User") !== null) ? (
          JSON.parse(window.sessionStorage.getItem("User")).type === "admin" ? (
            <Redirect to="/admin/" />
          ) : null
        ) : null}
        <div className="area"></div>
        <nav className="main-menu" style={{ backgroundColor: "black" }}>
          <ul>
            <li>
              <a
                onClick={() => {
                  this.changeStatus(1);
                }}
              >
                <i className="fa">
                  <FaDownload />
                </i>
                <span className="nav-text">Export Weather Data</span>
              </a>
            </li>
            <li className="has-subnav">
              <a
                onClick={() => {
                  this.changeStatus(2);
                }}
              >
                <i className="fa">
                  <MdReportProblem />
                </i>
                <span className="nav-text">Disease Report View</span>
              </a>
            </li>
            <li className="has-subnav">
              <a
                onClick={() => {
                  this.changeStatus(3);
                }}
              >
                <i className="fa">
                  <TiExport />
                </i>
                <span className="nav-text">Export Map</span>
              </a>
            </li>
          </ul>
          <ul className="logout">
            <li>
              <a
                onClick={() => {
                  this.changeStatus(4);
                }}
              >
                <i className="fa fa-lock fa-2x"></i>
                <span className="nav-text">Change Password</span>
              </a>
            </li>
            <li>
              <LogoutUser />
            </li>
          </ul>
        </nav>
        <MapComponent />
        {this.state.active === 1 ? <ExportData reset={this.reset} /> : null}
        {this.state.active === 2 ? <DiseaseReport reset={this.reset} /> : null}
        {this.state.active === 3 ? <ExportMap reset={this.reset} /> : null}
        {this.state.active === 4 ? <ChangePassword reset={this.reset} /> : null}
      </React.Fragment>
    );
  }
}
  