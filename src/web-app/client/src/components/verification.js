import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
export default class Verification extends Component {
    state = {
        username: '',
        password: '',
        confirmPassword: '',
        check: 0,
        idUser: '',
        success: 2
    }
    componentDidMount() {
        var VerifyUrl = "http://localhost:3000/verify/"
        var idUser = window.location.href.slice(VerifyUrl.length)
        if (idUser[idUser.length - 1] === '/') {
            idUser = idUser.slice(0, idUser.length - 1)
        }
        // console.log("final:",idUser);
        this.setState({ idUser })
        axios.get("http://localhost:4000/api/verify/" + idUser)
            .then(res => {
                this.setState({ check: res.data })
            })
            .catch(err => {
                console.log(err)
            })

    }



    onChangeUsername = (e) => {
        this.setState({ username: e.target.value })
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
            username: this.state.username,
            password: this.state.password
        }
        axios.post("http://localhost:4000/api/verify", User_obj)
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
                    (this.state.check) == 0 ?
                        (<React.Fragment>
                            access denied
                        </React.Fragment>)
                        : (this.state.check) == 1 ? <React.Fragment>
                            <form class="form-inline" onSubmit={this.onSubmit}>
                                <input type="text" class="form-control" id="Username" placeholder="Username" value={this.state.username} onChange={this.onChangeUsername} />
                                <input type="password" class="form-control" id="Password" placeholder="Password" value={this.state.password} onChange={this.onChangePassword} />
                                <input type="password" class="form-control" id="ConfirmPassword" placeholder="Confirm Password" value={this.state.confirmPassword} onChange={this.onChangeConfirmPassword} />
                                <input type="submit" value="Submit" class="btn btn-primary mb-2" />
                            </form>
                            {this.state.success == false ? (
                                <p className="alert-danger">
                                    Username Already Exists.
                                </p>
                            ) : null}

                        </React.Fragment>
                            :
                            <React.Fragment>
                                You have Been successfully registered.
                            </React.Fragment>
                }

            </React.Fragment>
        )
    }



}
