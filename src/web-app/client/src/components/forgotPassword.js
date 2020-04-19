import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

export default class Verification extends Component {
    state = {
        username: '',
        type: "monitor",
        idUser: '',
        success: 2
    }
    onChangeUsername = (event) => {
        this.setState({ username: event.target.value });
    };
    onChangeType = event => {
        this.setState({
            type: event.target.value
        });
    };

    onSubmit = e => {
        e.preventDefault();
        // console.log("olaola");
        if (this.state.username === "") {
            alert("Please fill the required fields.");
            return;
        }
        const User_obj = {
            username: this.state.username,
            type: this.state.type
        }
        axios.post("http://localhost:4000/api/forgotPassword", User_obj)
            .then(res => {
                this.setState({ success: res.data })
                console.log(this.state.success);
            })
        
    }




    render() {
        return (
            <React.Fragment>
                {
                    this.state.success == 2 || this.state.success == 0 ?
                        <React.Fragment>
                            <form class="form-inline" onSubmit={this.onSubmit}>
                                <input type="text" class="form-control" id="Username" placeholder="Username" value={this.state.username} onChange={this.onChangeUsername} />
                                <select
                                    style={{ fontSize: 20 }}
                                    className="browser-default custom-select"
                                    onChange={this.onChangeType}
                                >
                                    <option value="monitor">Monitor</option>
                                    <option value="admin">Admin</option>
                                </select>
                                <input type="submit" value="Submit" class="btn btn-primary mb-2" />
                            </form>
                        </React.Fragment>
                        : this.state.success == 1 ?
                            <p className="alert-success">
                                Reset link has been sent to your mail.
                        </p>
                            : null
                }
                {
                    this.state.success == 0 ?
                        <p className="alert-danger">
                            Invalid Details.
                  </p> : null
                }
            </React.Fragment>
        )
    }

}
