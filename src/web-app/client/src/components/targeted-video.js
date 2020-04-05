import React, { Component } from "react";
import ModalTemplate from "./ModalTemplate";
import axios from "axios";
export default class AddVideo extends Component {
  state = { URL: "" };


  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.URL == "") {
      alert("Please Enter a valid URL");
      return;
    }
    const URL_Obj = {
      url: this.state.URL
    }
    axios.post("http://localhost:4000/api/TargetedVideo", URL_Obj)
      .then(res => {
        // console.log(res)
        this.setState({ URL: '' })
        if (res.data === true) {
          alert("New URL added")
        }
        else {
          alert("Unable to add the URL")
        }
      })
      .catch(err => {
        console.log(err)
      })
  }


  onChangeURL = (e) => {
    this.setState({
      URL: e.target.value
    })
    // console.log(this.state.URL)
  }




  render() {
    return (
      <ModalTemplate active={true} title="Add Targeted Video" reset={this.props.reset} onSubmit={this.onSubmit}>
        <input type="text" class="form-control" placeholder="Enter the URL here" value={this.state.URL} onChange={this.onChangeURL} />
      </ModalTemplate>
    );
  }
}
