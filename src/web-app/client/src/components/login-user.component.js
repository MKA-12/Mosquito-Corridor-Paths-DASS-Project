import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  Nav,
  Card,
  CardText,
  CardBody,
  CardHeader,
  TabContent,
  NavItem,
  NavLink,
  TabPane
} from "reactstrap";
import { FaUser, FaLock } from "react-icons/fa";
import axios from "axios";
import "../App.css";
export default class LoginUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      type: "monitor",
      auth: false,
      logErr: false
    };
  }
  onChangeType = event => {
    this.setState({
      type: event.target.value
    });
  };
  onChangeUsername = event => {
    this.setState({ username: event.target.value });
  };

  onChangePassword = event => {
    this.setState({ password: event.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    if (this.state.username === "" || this.state.password === "") {
      alert("Please fill the required fields.");
      return;
    }
    const loginData = {
      username: this.state.username,
      password: this.state.password,
      type: this.state.type
    };
    console.log(loginData);
    axios
      .post("http://localhost:4000/api/validate", loginData)
      .then(res => {
        console.log(res.data);
        if (res.data === false) {
          this.setState({
            auth: false,
            logErr: true
          });
          console.log(res.data);
        } else {
          this.setState({
            auth: true,
            logErr: true
          });
          console.log(res.data);
          let storageItem = {
            id: res.data._id,
            type: this.state.type,
            username: res.data.username,
            name: res.data.name
          };
          window.sessionStorage.setItem("User", JSON.stringify(storageItem));
          console.log(JSON.parse(window.sessionStorage.getItem("User")).id);
        }
      })
      .catch(err => console.log(err));

    this.setState({
      username: "",
      password: "",
      name: ""
    });
  };
  // componentDidMount(){
  //   document.body.style.background="#000000"
  // }
  render() {
    return (
      <div
        className="float-left"
        style={{
          "margin-top": 250,
          marginLeft: 360
        }}
      >
        <Navbar
          style={{ backgroundColor: "black" }}
          inverse
          className="fixed-top collapseOnSelect nav-bar"
          // color="dark"
          dark
        >
          <NavbarBrand>
            Mosquito Corridor Detection and Visualization System
          </NavbarBrand>
        </Navbar>

        <Card style={{ width: "30rem", height: "25rem" }}>
          {/* <Nav tabs>
                <NavItem>
                  <NavLink>Admin</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink>Monitor</NavLink>
                </NavItem>
              </Nav> */}
          <CardHeader
            style={{ backgroundColor: "black", color: "white",fontSize:25 }}
          >
            Sign in
          </CardHeader>
          <CardBody>
            <form onSubmit={this.onSubmit} style={{ marginTop: 0 }}>
              <div className="form-group">
                {/* <br /> */}
                {/* <br /> */}
                {/* <label>Username: </label> */}
                {/* <CardText>Username: </CardText> */}
                {/* <input
                  type="text"
                  className="form-control"
                  value={this.state.username}
                  onChange={this.onChangeUsername}
                /> */}
              </div>
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="basic-addon1">
                    <FaUser />
                  </span>
                </div>
                <input
                  style={{ fontSize: 20 }}
                  type="text"
                  class="form-control"
                  placeholder="Username"
                  value={this.state.username}
                  onChange={this.onChangeUsername}
                />
              </div>
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="basic-addon1">
                    <FaLock />
                  </span>
                </div>
                <input
                  style={{ fontSize: 20 }}
                  type="password"
                  class="form-control"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.onChangePassword}
                />
              </div>
              {/* <div className="form-group">
                <label>Password: </label>
                <input
                  type="password"
                  className="form-control"
                  value={this.state.password}
                  onChange={this.onChangePassword}
                />
              </div> */}
              <select
                style={{ fontSize: 20 }}
                className="browser-default custom-select"
                onChange={this.onChangeType}
              >
                <option value="monitor">Monitor</option>
                <option value="admin">Admin</option>
              </select>
              <p></p>
              <div className="form-group">
                <input
                  type="submit"
                  value="Login"
                  className="btn btn-primary"
                  onClick={this.onSubmit}
                />
              </div>
              {this.state.logErr === true ? (
                this.state.auth === false ? (
                  <p className="alert-danger">Incorrect Username or Password</p>
                ) : this.state.type === "admin" ? (
                  <Redirect to="/admin/" />
                ) : (
                  <Redirect to="/monitor/" />
                )
              ) : null}
            </form>
          </CardBody>
        </Card>
      </div>
    );
  }
}
