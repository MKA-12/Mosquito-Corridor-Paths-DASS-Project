import React from "react";
// import { Navbar, NavbarBrand, CustomInput } from "reactstrap";
import "./App.css";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import LoginUser from "./components/login-user.component";
import AdminComponent from "./components/admin.component";
import MonitorComponent from "./components/monitor.component";
import Verification from "./components/verification";
import ForgotPassword from "./components/forgotPassword";
import ResetPassword from "./components/resetPassword";

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
function CheckforgotPass(){
  var URL = window.location.href
  var ForgotPassUrl  = "http://localhost:3000/forgotPassword/"
  if(URL.length < ForgotPassUrl.length){
    return true;
  }
  for (var i = 0; i < ForgotPassUrl.length; i++) {
    if(URL[i] !== ForgotPassUrl[i]){
      return true;
    }
  }
  return false;
}
function CheckResetPassword(){
  var URL = window.location.href
  var ResetPassUrl  = "http://localhost:3000/resetPassword/"
  if(URL.length < ResetPassUrl.length){
    return true;
  }
  for (var i = 0; i < ResetPassUrl.length; i++) {
    if(URL[i] !== ResetPassUrl[i]){
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
        {(JSON.parse(window.sessionStorage.getItem("User")) === null) && CheckVerify() && CheckforgotPass() && CheckResetPassword()? (
          <Redirect to="/" />
        ) : null}
        <Route path="/verify/*" exact component={Verification} />
        <Route path="/forgotPassword/*" exact component = {ForgotPassword}/>
        <Route path="/resetPassword/*" exact component = {ResetPassword}/>
      </div>
    </Router>
  );
}

export default App;
