import React, { Component } from "react";
import { Card, CardBody, Button, Spinner } from "reactstrap";
import { FaUser } from "react-icons/fa";
import { MdLock } from "react-icons/md";
import axios from "axios";

export default class Verification extends Component {
  state = {
    username: "",
    type: "monitor",
    idUser: "",
    success: 2,
    alert: false,
    loading: false,
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
    this.setState({ loading: false, success: 2, alert: false });
    if (this.state.username === "") {
      this.setState({ alert: true });
      return;
    }
    const User_obj = {
      username: this.state.username,
      type: this.state.type,
    };
    this.setState({ loading: true });
    axios
      .post("http://localhost:4000/api/forgotPassword", User_obj)
      .then((res) => {
        this.setState({ success: res.data });
      });
  };
  alertPrompt = () => {
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
          backgroundColor:"white",
        }}
      >
        <Card style={{ width: "25rem", height: "29rem" }}>
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
            <p style={{ alignSelf: "center" }}>
              You can reset you password here!
            </p>
            {this.state.success === 2 || this.state.success === 0 ? (
              <React.Fragment>
                <form onSubmit={this.onSubmit}>
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="basic-addon1">
                        <FaUser />
                      </span>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Username"
                      value={this.state.username}
                      onChange={this.onChangeUsername}
                    />
                  </div>
                  <select
                    className="browser-default custom-select"
                    onChange={this.onChangeType}
                  >
                    <option value="monitor">Monitor</option>
                    <option value="admin">Admin</option>
                  </select>
                  <br />
                  <br />
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
            ) : this.state.success === true ? (
              <p className="alert-success">
                Reset link has been sent to your mail.
              </p>
            ) : null}
            {this.state.loading === true && this.state.success === 2 ? (
              <Spinner
                type="grow"
                color="dark"
                style={{ alignSelf: "center" }}
              />
            ) : null}
            {this.state.success === false ? (
              <p className="alert-danger">Invalid Details.</p>
            ) : (
              this.state.alert && this.alertPrompt()
            )}
          </CardBody>
        </Card>
      </div>
    );
  }
}
