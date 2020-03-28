import React, { Component } from "react";
// import { Link, Route } from "react-router-dom";
import { NavbarBrand, Navbar, Button } from "reactstrap";
import LogoutUser from "./logout-user.component";
import DiseaseReport from "./diseaseReport";
import ExportData from "./exportData";
import MapComponent from "./map.component";
import ExportMap from "./exportMap";
import { TiExport } from "react-icons/ti";
import { MdReportProblem } from "react-icons/md";
import { FaDownload } from "react-icons/fa";
export default class MonitorComponent extends Component {
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
              <li class="has-subnav">
                <a
                  onClick={() => {
                    this.buttonTwo();
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
                    this.buttonThree();
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
                {/* <a href="#">
                  <i class="fa fa-power-off fa-2x"><LogoutUser/></i>
                  <span class="nav-text">Logout</span>
                </a> */}
                <LogoutUser/>
              </li>
            </ul>
          </nav>
          <MapComponent />
          {this.state.active == 1 ? (
            <div>
              <ExportData active={true} reset={this.reset} />
            </div>
          ) : null}
          {this.state.active == 2 ? (
            <div>
              <DiseaseReport active={true} reset={this.reset} />
            </div>
          ) : null}
          {this.state.active == 3 ? (
            <div>
              <ExportMap active={true} reset={this.reset} />
            </div>
          ) : null}
        </React.Fragment>
      </div>
    );
  }
}
