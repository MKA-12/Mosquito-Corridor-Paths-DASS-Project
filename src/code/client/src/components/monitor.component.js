import React, { Component } from "react";
// import { Link, Route } from "react-router-dom";
import { NavbarBrand, Navbar } from "reactstrap";
import LogoutUser from "./logout-user.component";
export default class MonitorComponent extends Component {
  constructor(props) {
    super(props);
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
      </div>
    );
  }
}
