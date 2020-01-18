import React from "react";
import {withRouter} from "react-router-dom";
import bcrypt from "bcryptjs";
import "./LoginForm.css";

class LoginForm extends React.Component {
    constructor() {
        super();
        this.apiURL = "https://localhost:8000";
        this.state = {
            username: "",
            password: "",
            status: {},
            errors: {}, 
        }
    }

    handleSubmit = event => {
        event.preventDefault();
        let status = {};
        if (this.state.username === "" || this.state.password === "") {
            status = {
                statusMsg: <p className="LoginForm-statusMsg">Fields cannot be empty.</p>
            }
            this.setState({
                status: status
            });
            return;
        }

        if (Object.keys(this.state.errors).length === 0) {
            let _salt = "$2a$10$TA/n/n7wv45LTEUEOlEqf.";
            const user = {
                username: this.state.username,
                password: bcrypt.hashSync(this.state.password, _salt),
            }

            fetch(`${this.apiURL}/user/login`, {
                method: "POST",
                body: JSON.stringify(user),
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            })
            .then(response => response.json())
            .then(response => {
                if (response.success) {
                    status = {
                        statusMsg: <p className="LoginForm-statusMsg">{response.statusMsg}</p>
                    }
                    this.setState({
                        status: status
                    }, () => setTimeout(() => {
                        this.props.setLoggedStatus(true, response.username, response.token);
                        this.props.history.push("/");
                    }, 5000));
                } else {
                    status = {
                        statusMsg: <p className="LoginForm-statusMsg">{response.statusMsg}</p>
                    }

                    this.setState({
                        status : status
                    })
                }
            });
        }
    }

    handleChange = event => {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <div className="FormContainer">
                {this.state.status && this.state.status.statusMsg}
                <form className="LoginForm" onSubmit={this.handleSubmit}>
                    <div className="LoginForm-inputContainer">
                        <input 
                            className="LoginForm-input"
                            type="text"
                            name="username"
                            placeholder="Username"
                            onChange={this.handleChange}
                        />
                    </div>

                    <div className="LoginForm-inputContainer">
                        <input 
                            className="LoginForm-input"
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={this.handleChange}
                        />
                    </div>

                    <div className="LoginForm-inputContainer">
                        <input
                            className="LoginForm-submitBtn"
                            type="submit" 
                        />
                    </div>
                </form>
            </div>
        )
    }
}

export default withRouter(LoginForm);