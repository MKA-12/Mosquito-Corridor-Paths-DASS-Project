import axios from "axios";
import React, { Component } from "react";
import ModalTemplate from "./ModalTemplate";
export default class ChangePassword extends Component {
  state = {
    NewPassword: "",
    ReNewPassword: "",
    alert: 0
  }





  onSubmit = (e) => {
    this.setState({ alert: 0 })
    e.preventDefault();

    if (this.state.NewPassword === '' || this.state.ReNewPassword === '') {
      this.setState({ alert: 1 })
      return;
    }
    else if (this.state.NewPassword !== this.state.ReNewPassword && this.state.NewPassword != '') {
      // alert("Passwords Donot match");
      this.setState({ alert: 2 })
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
        // console.log(res)
        this.setState({ NewPassword: '', ReNewPassword: '' })
        if (res.data === true) {
          // alert("Password Changed Succesfully")
          this.setState({ alert: 3 })
        }
        else {
          // alert("Unable to update the password")
          this.setState({ alert: 4 })
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



  render() {
    return (
      <ModalTemplate active={true} title="Change Your Password" reset={this.props.reset} onSubmit={this.onSubmit}>
        <input type="password" class="form-control" placeholder="Enter New Password" value={this.state.NewPassword} onChange={this.onChangeNewPass} />
        <br />
        <input type="password" class="form-control" placeholder="Re-Enter New Password" value={this.state.ReNewPassword} onChange={this.onChangeReNewPass} />
        {/* {console.log("http://localhost:4000/api/"+key.type+"/"+key.id)} */}

        <br />{
          this.state.alert === 1 ?
            <p className="alert-danger">
              Please fill in all the fields.
            </p> :
            this.state.alert === 2 ?
              <p className="alert-danger">
                Passwords Don't Match.
              </p> : this.state.alert === 3 ?
                <p className="alert-success">
                  Password Changed Succesfully.
              </p> :
                this.state.alert === 2 ?
                <p className="alert-danger">
                  Couldn't change the password, please try again in a while.
                </p> : null
        }
      </ModalTemplate>
    );
  }
}
