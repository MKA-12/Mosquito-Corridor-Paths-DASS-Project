import React, { Component } from 'react';
import axios from 'axios';


class VendorRegister extends Component {
    constructor(props) {
        super(props);
        this.state = {
            VendorName: '',
            VendorPasswd: ''
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
            VendorName: this.state.VendorName,
            VendorPasswd: this.state.VendorPasswd
        };

        axios({
                url: 'http://localhost:5000/api/Vendors/register',
                method: 'POST',
                data: added_item
            })
            .then(() => {
                console.log("Data added");
                this.props.history.push('/login');
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
            name = "VendorName"
            placeholder = "VendorName"
            value = { this.state.VendorName }
            onChange = { this.handleChange }
            required >
            <
            /input>  <
            input type = "string"
            name = "VendorPasswd"
            placeholder = "VendorPasswd"
            value = { this.state.VendorPasswd }
            onChange = { this.handleChange }
            required >
            <
            /input>  <
            button type = "submit" > Vendor Register < /button>  < /
            form > <
            /div>
        );
    }
}

export default VendorRegister;