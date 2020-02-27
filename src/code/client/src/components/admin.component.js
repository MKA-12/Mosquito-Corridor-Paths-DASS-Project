import React, { Component } from "react";
// import { Link, Route } from "react-router-dom";
import { NavbarBrand, Navbar } from "reactstrap";
import LogoutUser from "./logout-user.component";
// import "../openlayers/libs/v6.1.1-dist/ol"
export default class AdminComponent extends Component {
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
          <NavbarBrand>
            Mosquito Corridor Detection and Visualization System
          </NavbarBrand>
          <NavbarBrand>
            <LogoutUser />
          </NavbarBrand>
        </Navbar>
      </div>
    );
  }
}
