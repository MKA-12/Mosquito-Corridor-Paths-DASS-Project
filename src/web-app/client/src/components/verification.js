import React, { Component } from "react";
import { Card, CardBody, Button } from "reactstrap";
import { FaUser, FaLock, FaSadCry } from "react-icons/fa";
import axios from "axios";
export default class Verification extends Component {
  state = {
    username: "",
    password: "",
    confirmPassword: "",
    check: 0,
    idUser: "",
    success: 2,
    emptyFields: false,
    DonotMatch: false,
  };
  componentDidMount() {
    var VerifyUrl = "http://localhost:3000/verify/";
    var idUser = window.location.href.slice(VerifyUrl.length);
    if (idUser[idUser.length - 1] === "/") {
      idUser = idUser.slice(0, idUser.length - 1);
    }
    this.setState({ idUser });
    axios
      .get("http://localhost:4000/api/verify/" + idUser)
      .then((res) => {
        this.setState({ check: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  onChangeUsername = (e) => {
    this.setState({ username: e.target.value });
  };
  onChangePassword = (e) => {
    this.setState({ password: e.target.value });
  };
  onChangeConfirmPassword = (e) => {
    this.setState({ confirmPassword: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.setState({ emptyFields: false, DonotMatch: false });
    if (
      this.state.password === "" ||
      this.state.confirmPassword === "" ||
      this.state.username === ""
    ) {
      this.setState({ emptyFields: true });
      return;
    }
    if (this.state.password !== this.state.confirmPassword) {
      this.setState({ DonotMatch: true });
      return;
    }
    const User_obj = {
      id: this.state.idUser,
      username: this.state.username,
      password: this.state.password,
    };
    axios.post("http://localhost:4000/api/verify", User_obj).then((res) => {
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
  emptyFields = () => {
    return (
      <div style={{ color: "FireBrick", padding: 0 }}>
        Please fill the required fields.
      </div>
    );
  };
  DonotMatch = () => {
    return (
      <div style={{ color: "FireBrick", padding: 0 }}>
        Passwords don't match.
      </div>
    );
  };
  render() {
    return (
      <React.Fragment>
        {this.state.check == 0 ? (
          <p className="alert-danger">access denied</p>
        ) : this.state.check == 1 ? (
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
                <h2 style={{ alignSelf: "center" }}> Register Yourself! </h2>
                <p style={{ alignSelf: "center" }}>
                  Use these login details while signing in as monitor.
                </p>
                <form onSubmit={this.onSubmit}>
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text" id="basic-addon1">
                        <FaUser />
                      </span>
                    </div>
                    <input
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
                      Register
                    </Button>
                  </div>
                </form>
                {this.state.success == false ? (
                  <p className="alert-danger">Username Already Exists.</p>
                ) : null}
                {this.state.emptyFields && this.emptyFields()}
                {this.state.DonotMatch && this.DonotMatch()}
              </CardBody>
            </Card>
          </div>
        ) : (
          <p className="alert-success">
            You have Been successfully registered.
          </p>
        )}
      </React.Fragment>
    );
  }
}