import axios from "axios";
import React, { Component } from "react";
import ModalTemplate from "./ModalTemplate";
export default class ChangePassword extends Component {
  state = {NewPassword :"" , ReNewPassword : ""}
  
  
  
  
  
  onSubmit = (e) =>{
    e.preventDefault();
    if (this.state.NewPassword !== this.state.ReNewPassword){
      alert ("Passwords Donot match");
      return;
    }
    var key = JSON.parse(window.sessionStorage.getItem("User"))
    const User_obj = {
      name : key.name,
      username : key.username,
      password: this.state.NewPassword
    }
    axios.put("http://localhost:4000/api/"+key.type+"/"+key.id, User_obj)
      .then(res => {
        // console.log(res)
        this.setState({ NewPassword: '' ,ReNewPassword : ''})
        if (res.data === true){
          alert("Password Changed Succesfully")
        }
        else {
          alert("Unable to update the password")
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  
  onChangeNewPass = (e) =>{
    this.setState({
      NewPassword : e.target.value
    })
  }
  onChangeReNewPass = (e) =>{
    this.setState({
      ReNewPassword : e.target.value
    })
  }
  
  
  
  render() {
    return (
      <ModalTemplate active={true} title="Change Your Password" reset={this.props.reset} onSubmit = {this.onSubmit}>
        <input type = "password" class="form-control" placeholder="Enter New Password" value={this.state.NewPassword} onChange={this.onChangeNewPass} />
        <br/>
        <input type =  "password" class="form-control" placeholder="Re-Enter New Password" value={this.state.ReNewPassword} onChange={this.onChangeReNewPass} />
      
      {/* {console.log("http://localhost:4000/api/"+key.type+"/"+key.id)} */}
      </ModalTemplate>
    );
  }
}
