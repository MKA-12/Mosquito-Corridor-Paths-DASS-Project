import React, { Component, useState } from "react";
// import { Navbar, NavbarBrand, CustomInput } from "reactstrap";
import "./App.css";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import LoginUser from "./components/login-user.component";
import AdminComponent from "./components/admin.component";
import MonitorComponent from "./components/monitor.component";
import Verification from "./components/verification";

function CheckVerify() {
  var URL = window.location.href
  var VerifyUrl  = "http://localhost:3000/verify/"
  if(URL.length < VerifyUrl.length){
    return true;
  }
  for (var i = 0; i < VerifyUrl.length; i++) {
    if(URL[i] !== VerifyUrl[i]){
      return true;
    }
  }
  return false;
}

function App() {
  return (
    <Router>
      <div className="container" style={{ backgroundColor: "#FFFFFF" }}>
        <Route path="/" exact component={LoginUser} />
        <Route path="/admin/*" exact component={AdminComponent} />
        <Route path="/monitor/*" exact component={MonitorComponent} />
        {
          // console.log("hi,")
          console.log("Hi,", window.location.href.split('/')[(window.location.href.split('/').length) - 1])
        }
        {(JSON.parse(window.sessionStorage.getItem("User")) === null) && CheckVerify() ? (
          <Redirect to="/" />
        ) : null}
        <Route path="/verify/*" exact component={Verification} />
      </div>
    </Router>
  );
}

export default App;
