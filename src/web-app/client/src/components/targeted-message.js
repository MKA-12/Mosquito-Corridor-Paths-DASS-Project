import axios from "axios";
import React, { Component } from "react";
import ModalTemplate from "./ModalTemplate";
export default class AddMessage extends Component {
  state = {
    Message: "",
    error: false,
    success: false,
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.Message === "") {
      this.setState({ error: 1 });
      return;
    }
    const Message_obj = {
      message: this.state.Message,
    };
    axios
      .post("http://localhost:4000/api/TargetedMessage", Message_obj)
      .then((res) => {
        this.setState({ Message: "", error: false, success: true });
      })
      .catch((err) => {
        this.setState({ Message: "", error: true, success: false });
        console.log(err);
      });
  };

  errorprompt = () => {
    return <div style={{ color: "red" }}>Unable to add the message</div>;
  };
  successprompt = () => {
    return (
      <div style={{ color: "green", background: "lightgreen", padding: 0 }}>
        New Message added successfully
      </div>
    );
  };

  onChangeMessage = (e) => {
    this.setState({
      Message: e.target.value,
    });
  };
  render() {
    return (
      <ModalTemplate
        active={true}
        title="Add Targeted Message"
        reset={this.props.reset}
        onSubmit={this.onSubmit}
      >
        <textarea
          rows="5"
          class="form-control"
          placeholder="Enter the Message here and please try to limit the message to 250 characters"
          value={this.state.Message}
          onChange={this.onChangeMessage}
        />
        {this.state.error && this.errorprompt()}
        {this.state.success && this.successprompt()}
      </ModalTemplate>
    );
  }
}
