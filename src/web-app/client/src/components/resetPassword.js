import React, { Component } from "react";
// import ModalTemplate from "./ModalTemplate";
import axios from "axios";

export default class Verification extends Component {
    state = {
        password: '',
        confirmPassword: '',
        check: false,
        idUser: '',
        success: 2
    }

    componentDidMount() {
        var ResetUrl = "http://localhost:3000/resetPassword/"
        var idUser = window.location.href.slice(ResetUrl.length)
        if (idUser[idUser.length - 1] === '/') {
            idUser = idUser.slice(0, idUser.length - 1)
        }
        console.log("final:", idUser);
        this.setState({ idUser })
        axios.get("http://localhost:4000/api/resetPassword/" + idUser)
            .then(res => {
                this.setState({ check: res.data })
                console.log("success:", this.state.check)
            })
            .catch(err => {
                console.log("fucked up")
                console.log(err)
            })
    }
    onChangePassword = (e) => {
        this.setState({ password: e.target.value })
    }
    onChangeConfirmPassword = (e) => {
        this.setState({ confirmPassword: e.target.value })
    }
    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.password !== this.state.confirmPassword) {
            alert("Passwords Donot match");
            return;
        }
        const User_obj = {
            id: this.state.idUser,
            password: this.state.password
        }
        axios.post("http://localhost:4000/api/resetPassword", User_obj)
            .then(res => {
                this.setState({ success: res.data })
            })
        this.setState({
            username: '',
            password: '',
            confirmPassword: '',
            check: 2,
            idUser: '',
            success: 2,
        });

    }


    render() {
        return (
            <React.Fragment>
                {
                    (this.state.check) === false ?
                        (<React.Fragment>
                            access denied
                        </React.Fragment>)
                        : (this.state.check) === true ?
                            <React.Fragment>
                                <form class="form-inline" onSubmit={this.onSubmit}>
                                    <input type="password" class="form-control" id="Password" placeholder="Password" value={this.state.password} onChange={this.onChangePassword} />
                                    <input type="password" class="form-control" id="ConfirmPassword" placeholder="Confirm Password" value={this.state.confirmPassword} onChange={this.onChangeConfirmPassword} />
                                    <input type="submit" value="Submit" class="btn btn-primary mb-2" />
                                </form>
                            </React.Fragment>
                            :
                            <React.Fragment>
                                Password changed Succesfully.
                            </React.Fragment>
                }
            </React.Fragment>
        )
    }

}





