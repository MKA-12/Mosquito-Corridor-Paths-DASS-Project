import React, { Component } from "react";
import axios from "axios";
import { Card, CardBody, Button } from "reactstrap";
import { FaLock } from "react-icons/fa";

export default class Verification extends Component {
  state = {
    password: "",
    confirmPassword: "",
    check: false,
    idUser: "",
    success: 2,
    noFields: false,
    passwordsDonotMatch: false,
  };
  componentDidMount() {
    var ResetUrl = "http://localhost:3000/resetPassword/";
    var idUser = window.location.href.slice(ResetUrl.length);
    if (idUser[idUser.length - 1] === "/") {
      idUser = idUser.slice(0, idUser.length - 1);
    }
    this.setState({ idUser });
    axios
      .get("http://localhost:4000/api/resetPassword/" + idUser)
      .then((res) => {
        this.setState({ check: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  onChangePassword = (e) => {
    this.setState({ password: e.target.value });
  };
  onChangeConfirmPassword = (e) => {
    this.setState({ confirmPassword: e.target.value });
  };
  onSubmit = (e) => {
    e.preventDefault();
    this.setState({ noFields: false, passwordsDonotMatch: false });
    if (this.state.password === "" || this.state.confirmPassword === "") {
      this.setState({ noFields: true });
      return;
    }
    if (this.state.password !== this.state.confirmPassword) {
      this.setState({ passwordsDonotMatch: true });
      return;
    }
    const User_obj = {
      id: this.state.idUser,
      password: this.state.password,
    };
    axios
      .post("http://localhost:4000/api/resetPassword", User_obj)
      .then((res) => {
        this.setState({ success: res.data });
      });
    this.setState({
      username: "",
      password: "",
      confirmPassword: "",
      check: 2,
      idUser: "",
      success: 2,
    });
  };
  noFieldsPrompt = () => {
    return (
      <div style={{ color: "FireBrick", padding: 0 }}>
        Please fill the required fields.
      </div>
    );
  };
  passwordsDonotMatchPrompt = () => {
    return (
      <div style={{ color: "FireBrick", padding: 0 }}>
        Passwords don't match.
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
        <Card style={{ width: "25rem", height: "27rem" }}>
          <CardBody
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
            }}
          >
            <h2 style={{ alignSelf: "center" }}> Create New Password! </h2>
            <p style={{ alignSelf: "center" }}>
              We'll ask for this password whenever you sign in.
            </p>

            <React.Fragment>
              {this.state.check === false ? (
                <React.Fragment>access denied</React.Fragment>
              ) : this.state.check === true ? (
                <React.Fragment>
                  <form onSubmit={this.onSubmit}>
                    <div class="input-group mb-3">
                      <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1">
                          <FaLock />
                        </span>
                      </div>
                      <input
                        type="password"
                        class="form-control"
                        placeholder="Password"
                        value={this.state.password}
                        onChange={this.onChangePassword}
                      />
                    </div>
                    <div class="input-group mb-3">
                      <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1">
                          <FaLock />
                        </span>
                      </div>
                      <input
                        type="password"
                        class="form-control"
                        id="ConfirmPassword"
                        placeholder="Confirm Password"
                        value={this.state.confirmPassword}
                        onChange={this.onChangeConfirmPassword}
                      />
                    </div>
                    <div className="form-group">
                      <Button
                        onClick={this.onSubmit}
                        color="primary"
                        size="lg"
                        block
                      >
                        Reset Password
                      </Button>
                    </div>
                  </form>
                </React.Fragment>
              ) : (
                <p className="alert-success">Password changed Succesfully.</p>
              )}
            </React.Fragment>
            {this.state.noFields && this.noFieldsPrompt()}
            {this.state.passwordsDonotMatch && this.passwordsDonotMatchPrompt()}
          </CardBody>
        </Card>
      </div>
    );
  }
}
