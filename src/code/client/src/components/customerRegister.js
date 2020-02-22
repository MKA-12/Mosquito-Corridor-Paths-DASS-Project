import React, { Component } from 'react';
import axios from 'axios';

class customerRegister extends Component {
    constructor(props) {
        super(props);
        this.state = {
            CustomerName: '',
            CustomerPasswd: ''
        }
        this.handle_Submit = this.handle_Submit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handle_Submit(event) {
        const added_item = {
            CustomerName: this.state.CustomerName,
            CustomerPasswd: this.state.CustomerPasswd
        };

        axios({
                url: 'http://localhost:5000/api/Customers/register',
                method: 'POST',
                data: added_item
            })
            .then(() => {
                console.log("Data added");
            })
            .catch(() => {
                console.log("Error");
            });
        event.preventDefault();
    }

    render() {
        return ( <
            div >
            <
            form onSubmit = { this.handle_Submit } >
            <
            input type = "string"
            name = "CustomerName"
            placeholder = "CustomerName"
            value = { this.state.CustomerName }
            onChange = { this.handleChange }
            required >
            <
            /input>  <
            input type = "string"
            name = "CustomerPasswd"
            placeholder = "CustomerPasswd"
            value = { this.state.CustomerPasswd }
            onChange = { this.handleChange }
            required >
            <
            /input>  <
            button type = "submit" > Customer Register < /button>  < /
            form > <
            /div>
        );
    }
}

export default customerRegister;