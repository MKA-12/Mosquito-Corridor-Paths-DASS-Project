import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Navbar, NavbarBrand, Card, CardBody, CardHeader } from "reactstrap";
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
      logErr: false,
      IncompleteFields: false,
    };
  }
  onChangeType = (event) => {
    this.setState({
      type: event.target.value,
    });
  };
  onChangeUsername = (event) => {
    this.setState({ username: event.target.value });
  };

  onChangePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.setState({ IncompleteFields: false, logErr: false });
    if (this.state.username === "" || this.state.password === "") {
      this.setState({ IncompleteFields: true });
      return;
    }
    const loginData = {
      username: this.state.username,
      password: this.state.password,
      type: this.state.type,
    };
    axios
      .post("http://localhost:4000/api/validate", loginData)
      .then((res) => {
        if (res.data === false) {
          this.setState({
            auth: false,
            logErr: true,
          });
        } else {
          this.setState({
            auth: true,
            logErr: true,
          });
          let storageItem = {
            id: res.data._id,
            type: this.state.type,
            username: res.data.username,
            name: res.data.name,
          };
          window.sessionStorage.setItem("User", JSON.stringify(storageItem));
        }
      })
      .catch((err) => console.log(err));

    this.setState({
      username: "",
      password: "",
      name: "",
    });
  };
  IncompleteFieldsPrompt = () => {
    return (
      <div
        style={{ color: "FireBrick", background: "LightSalmon", padding: 0 }}
      >
        Please fill the required fields.
      </div>
    );
  };
  render() {
    return (
      <div
        className="float-left"
        style={{
          "margin-top": 250,
          marginLeft: 360,
        }}
      >
        <Navbar
          style={{ backgroundColor: "black" }}
          inverse="true"
          className="fixed-top collapseOnSelect nav-bar"
          // color="dark"
          dark
        >
          <NavbarBrand>
            Mosquito Corridor Detection and Visualization System
          </NavbarBrand>
        </Navbar>

        <Card style={{ width: "30rem", height: "27rem" }}>
          <CardHeader
            style={{ backgroundColor: "black", color: "white", fontSize: 25 }}
          >
            Sign in
          </CardHeader>
          <CardBody>
            <form onSubmit={this.onSubmit} style={{ marginTop: 0 }}>
              <div className="form-group"></div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon1">
                    <FaUser />
                  </span>
                </div>
                <input
                  style={{ fontSize: 20 }}
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  value={this.state.username}
                  onChange={this.onChangeUsername}
                />
              </div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon1">
                    <FaLock />
                  </span>
                </div>
                <input
                  style={{ fontSize: 20 }}
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.onChangePassword}
                />
              </div>
              <select
                style={{ fontSize: 20 }}
                className="browser-default custom-select"
                onChange={this.onChangeType}
              >
                <option value="monitor">Monitor</option>
                <option value="admin">Admin</option>
              </select>
              <p></p>
              <a href="http://localhost:3000/forgotPassword/">
                Forgot Password?
              </a>
              <br />
              <br />
              <div className="form-group">
                <input
                  type="submit"
                  value="Login"
                  className="btn btn-primary btn-block"
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
            {this.state.IncompleteFields && this.IncompleteFieldsPrompt()}
          </CardBody>
        </Card>
      </div>
    );
  }
}
