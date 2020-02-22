import React, { Component, useState } from "react";
// import { Navbar, NavbarBrand, CustomInput } from "reactstrap";
import  "./App.css";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import LoginUser from "./components/login-user.component";
import AdminComponent from "./components/admin.component";
import MonitorComponent from "./components/monitor.component";
function App() {
  return (
    <Router>
      <div className="container">
        color="dark" dark > */}
        <Route path="/" exact component={LoginUser} />
        <Route path="/admin/*" exact component={AdminComponent} />
        <Route path="/monitor/*" exact component={MonitorComponent} />
        {JSON.parse(window.sessionStorage.getItem("User")) === null ? (
          <Redirect to="/" />
        ) : null}
      </div>
    </Router>
  );
}

export default App;
