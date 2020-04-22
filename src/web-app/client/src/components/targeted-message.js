import axios from "axios";
import React, { Component } from "react";
import ModalTemplate from "./ModalTemplate";
export default class AddMessage extends Component {
  state = {Message : ""};

  onSubmit = (e) =>{
    e.preventDefault();
    if(this.state.Message == ""){
      alert("Please Enter something");
      return;
    }
    const Message_obj ={
      message : this.state.Message
    }
    axios.post("http://localhost:4000/api/TargetedMessage", Message_obj)
      .then(res => {
        // console.log(res)
        this.setState({ Message: '' })
        if (res.data === true) {
          alert("New Message added to the database")
        }
        else {
          alert("Unable to add the Message")
        }
      })
      .catch(err => {
        console.log(err)
      })
  }




  onChangeMessage = (e) =>{
    this.setState({
      Message : e.target.value
    })
  }
  render() {
    return (
      <ModalTemplate active={true} title="Add Targeted Message" reset={this.props.reset} onSubmit={this.onSubmit}>
        <textarea rows = "5" class="form-control" placeholder="Enter the Message here and please try to limit the message to 250 characters" value={this.state.Message} onChange={this.onChangeMessage} />
      </ModalTemplate>
    );
  }
}
