import React, { Component } from "react";
import ModalTemplate from "./ModalTemplate";
import axios from "axios";
import { Spinner } from "reactstrap";
export default class NewMonitor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      name: "",
      success: 2,
      loading: 2,
      emptyFields: false,
    };
  }

  onChangeName = (event) => {
    this.setState({
      name: event.target.value,
    });
  };
  onChangeEmail = (event) => {
    this.setState({ email: event.target.value });
  };
  onSubmit = (e) => {
    e.preventDefault();
    this.setState({ loading: 0, success: 2 , emptyFields:false})

    if (this.state.email === "" || this.state.name === "") {
      this.setState({
        success: 2,
        emptyFields : true
      });
      return;
    }
    const newuser = {
      name: this.state.name,
      email: this.state.email.trim(),
      password: 'default',
      username: 'default',
      forgotPassCount: 0,
      verified: false
    };
    this.setState({ loading: 1 })
    axios.post("http://localhost:4000/api/monitor/", newuser).then((res) => {
      this.setState({ success: res.data })
      if(res.data){
        this.setState({
          name: "",
          email: "",
        });
      }
    });
   };
  emptyFields = () => {
    return (
      <div style={{ color: 'FireBrick', padding: 0 }}>Please fill the required fields.</div>
    )
  }
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
              <label>Client Email: </label>
              <input
                type="text"
                className="form-control"
                value={this.state.email}
                onChange={this.onChangeEmail}
              />
            </div>
          </form>
          {this.state.success === false ? (
            <p className="alert-danger">
              Invalid Email or Email already exists.
            </p>
          ) : null}
          {this.state.loading === 1 && this.state.success !== true && this.state.success !== false ? (
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
              <Spinner type="grow" color="dark" />
            </div>
          ) : null}
          {this.state.success === true ? (
            <p className="alert-success">Mail has been sent succesfully.</p>
          ) : null}
        </div>
        {this.state.emptyFields && this.emptyFields()}
      </ModalTemplate>
    );
  }
}
