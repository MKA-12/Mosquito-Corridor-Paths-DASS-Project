import axios from "axios";
import React, { Component } from "react";
import ModalTemplate from "./ModalTemplate";
export default class ChangePassword extends Component {
  state = {
    NewPassword: "",
    ReNewPassword: "",
    EmptyFields : false,
    PasswordsDonotMatch: false,
    Success: false
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.setState({EmptyFields : false , PasswordsDonotMatch : false, Success: false})
    if(this.state.NewPassword === '' || this.ReNewPassword === '')
    {
      this.setState({EmptyFields : true})
      return;
    }
    if (this.state.NewPassword !== this.state.ReNewPassword && this.state.NewPassword != null) {
      // alert("Passwords Donot match");
      this.setState({PasswordsDonotMatch : true})
      return;
    }
    var key = JSON.parse(window.sessionStorage.getItem("User"))
    const User_obj = {
      name: key.name,
      username: key.username,
      password: this.state.NewPassword
    }
    axios.put("http://localhost:4000/api/" + key.type + "/" + key.id, User_obj)
      .then(res => {
        this.setState({ NewPassword: '', ReNewPassword: '' })
        if (res.data === true) {
          // alert("Password Changed Succesfully")
          this.setState({Success : true})
        }
      })
      .catch(err => {
        console.log(err)
      })
  }


  onChangeNewPass = (e) => {
    this.setState({
      NewPassword: e.target.value
    })
  }
  onChangeReNewPass = (e) => {
    this.setState({
      ReNewPassword: e.target.value
    })
  }

  PasswordsDonotMatch = () => {
    return (
      <div style={{ color: 'FireBrick', padding: 0 }}>Passwords don't match.</div>
    )
  }
    EmptyFields = () => {
    return (
      <div style={{ color: 'FireBrick', padding: 0 }}>Fields are empty.</div>
    )
  }
  Success = () => {
    return (
      <div style={{ color: 'green', backgroundColor:'lightgreen', padding: 2 }}>Password Succesfully updated.</div>
    )
  }
  render() {
    return (
      <ModalTemplate active={true} title="Change Your Password" reset={this.props.reset} onSubmit={this.onSubmit}>
        <input type="password" className="form-control" placeholder="Enter New Password" value={this.state.NewPassword} onChange={this.onChangeNewPass} />
        <br />
        <input type="password" className="form-control" placeholder="Re-Enter New Password" value={this.state.ReNewPassword} onChange={this.onChangeReNewPass} />
        {this.state.EmptyFields && this.EmptyFields()}
        {this.state.PasswordsDonotMatch && this.PasswordsDonotMatch()}
        {this.state.Success && this.Success()}
      </ModalTemplate>
    );
  }
}
