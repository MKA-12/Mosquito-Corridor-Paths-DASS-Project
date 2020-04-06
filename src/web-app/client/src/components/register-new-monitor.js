import React, { Component } from "react";
import ModalTemplate from "./ModalTemplate";
import axios from "axios";
export default class NewMonitor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      name: "",
      success: 2,
    };
  }
  onChangeUsername = (event) => {
    this.setState({ username: event.target.value });
  };
  onChangeName = (event) => {
    this.setState({
      name: event.target.value,
    });
  };
  onChangePassword = (event) => {
    this.setState({ password: event.target.value });
  };
  onSubmit = (e) => {
    e.preventDefault();
    if (
      this.state.username === "" ||
      this.state.password === "" ||
      this.state.name === ""
    ) {
      this.setState({
        success: 2,
      });
      return;
    }
    const newuser = {
      name: this.state.name,
      username: this.state.username,
      password: this.state.password,
    };
    axios.post("http://localhost:4000/api/monitor/", newuser).then((res) => {
      if (res.data === true) {
        this.setState({
          success: 1,
        });
      } else {
        this.setState({
          success: 0,
        });
      }
    });
    this.setState({
      name: "",
      username: "",
      password: "",
    });
  };
  render() {
    return (
      <ModalTemplate
        active={true}
        title="Register New Monitor"
        reset={this.props.reset}
        onSubmit={this.onSubmit}
      >
        <div className="Login">
          <form>
            <div className="form-group">
              <label>Name: </label>
              <input
                type="text"
                className="form-control"
                value={this.state.name}
                onChange={this.onChangeName}
              />
            </div>
            <div className="form-group">
              <label>Your Username: </label>
              <input
                type="text"
                className="form-control"
                value={this.state.username}
                onChange={this.onChangeUsername}
              />
            </div>
            <div className="form-group">
              <label>Your Password: </label>
              <input
                type="password"
                className="form-control"
                value={this.state.password}
                onChange={this.onChangePassword}
              />
            </div>
          </form>
          {this.state.success === 0 ? (
            <p className="alert-danger">
              Username already exists, please choose a different username
            </p>
          ) : null}
          {this.state.success === 1 ? (
            <p className="alert-success">User successfully registered.</p>
          ) : null}
        </div>
      </ModalTemplate>
    );
  }
}
