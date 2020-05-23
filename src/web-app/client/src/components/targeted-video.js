import React, { Component } from "react";
import ModalTemplate from "./ModalTemplate";
import axios from "axios";
import { Spinner } from "reactstrap";
export default class AddVideo extends Component {
  state = {
    URL: "",
    FalseURL: false,
    success: false,
    error: false,
    alreadyExists: false,
  };
  onSubmit = (e) => {
    this.setState({
      error: false,
      success: false,
      FalseURL: false,
      alreadyExists: false,
      loading: true,
    });
    e.preventDefault();
    if (this.state.URL === "") {
      this.setState({ error: true, loading: false });
      return;
    }
    const URL_Obj = {
      url: this.state.URL,
    };
    this.setState({
      loading: true,
    });
    axios
      .post("http://localhost:4000/api/TargetedVideo", URL_Obj)
      .then((res) => {
        this.setState({ URL: "" });
        if (res.data === true) {
          this.setState({
            success: true,
            FalseURL: false,
            alreadyExists: false,
            loading: false,
          });
        } else if (res.data === false) {
          this.setState({
            FalseURL: true,
            success: false,
            alreadyExists: false,
            loading: false,
          });
        } else {
          this.setState({
            alreadyExists: true,
            success: false,
            FalseURL: false,
            loading: false,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  onChangeURL = (e) => {
    this.setState({
      URL: e.target.value,
    });
  };
  loadingPrompt = () => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Spinner type="grow" color="dark" />
      </div>
    );
  };
  errorprompt = () => {
    return <div style={{ color: "red" }}>The fields are empty</div>;
  };
  successprompt = () => {
    return (
      <div style={{ color: "green", background: "lightgreen", padding: 0 }}>
        New URL added successfully
      </div>
    );
  };
  FalseURLprompt = () => {
    return <div style={{ color: "red" }}>Please Enter a valid URL</div>;
  };
  AlreadyExistsprompt = () => {
    return <div style={{ color: "red" }}>Entered URL already exists!</div>;
  };
  render() {
    return (
      <ModalTemplate
        active={true}
        title="Add Targeted Video"
        reset={this.props.reset}
        onSubmit={this.onSubmit}
      >
        <input
          type="text"
          class="form-control"
          placeholder="Enter the URL here"
          value={this.state.URL}
          onChange={this.onChangeURL}
        />
        {this.state.loading && this.loadingPrompt()}
        {this.state.error && this.errorprompt()}
        {this.state.success && this.successprompt()}
        {this.state.FalseURL && this.FalseURLprompt()}
        {this.state.alreadyExists && this.AlreadyExistsprompt()}
      </ModalTemplate>
    );
  }
}
