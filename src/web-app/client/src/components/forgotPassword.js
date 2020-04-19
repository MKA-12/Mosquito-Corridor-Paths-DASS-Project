import React, { Component } from "react";
import {
  Card,
  CardBody,
  Button
} from "reactstrap";
import { FaUser } from "react-icons/fa";
import { MdLock } from "react-icons/md";

import axios from "axios";

export default class Verification extends Component {
  state = {
    username: "",
    type: "monitor",
    idUser: "",
    success: 2,
  };
  onChangeUsername = (event) => {
    this.setState({ username: event.target.value });
  };
  onChangeType = (event) => {
    this.setState({
      type: event.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    // console.log("olaola");
    if (this.state.username === "") {
      alert("Please fill the required fields.");
      return;
    }
    const User_obj = {
      username: this.state.username,
      type: this.state.type,
    };
    axios
      .post("http://localhost:4000/api/forgotPassword", User_obj)
      .then((res) => {
        this.setState({ success: res.data });
        console.log(this.state.success);
      });
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
            <div style={{ alignSelf: "center" }}>
              <MdLock fontSize={100} />
            </div>
            <h2 style={{ alignSelf: "center" }}> Forgot Password ? </h2>
            <p style={{ alignSelf: "center" }}>You can reset you password here!</p>
            {this.state.success == 2 || this.state.success == 0 ? (
              <React.Fragment>
                <form onSubmit={this.onSubmit}>
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text" id="basic-addon1">
                        <FaUser />
                      </span>
                    </div>
                    <input
                    //   style={{ fontSize: 20 }}
                      type="text"
                      class="form-control"
                      placeholder="Username"
                      value={this.state.username}
                      onChange={this.onChangeUsername}
                    />
                  </div>
                  <select
                    // style={{ fontSize: 20 }}
                    className="browser-default custom-select"
                    onChange={this.onChangeType}
                  >
                    <option value="monitor">Monitor</option>
                    <option value="admin">Admin</option>
                  </select>
                  <br />
                  <br />
                  <div className="form-group">
                    <Button onClick={this.onSubmit} color="primary" size="lg" block>Reset Password</Button>
                  </div>
                </form>
              </React.Fragment>
            ) : this.state.success == 1 ? (
              <p className="alert-success">
                Reset link has been sent to your mail.
              </p>
            ) : null}
            {this.state.success == 0 ? (
              <p className="alert-danger">Invalid Details.</p>
            ) : null}
          </CardBody>
        </Card>
      </div>
    );
  }
}
