import React from "react";
import {withRouter} from "react-router-dom";
import "./RegisterForm.css";

class RegisterForm extends React.Component {
    constructor() {
        super();
        this.usernameRegex = new RegExp(/^\w{4,12}$/);
        this.passwordRegex = new RegExp(/^(?=.*[A-Z])[A-Za-z0-9!£$%^&*()_+-=[\]{}:@~#,./\\]{8,}$/);
        this.state = {
            username: "",
            password: "",
            status: {},
            errors: {}, 
        }
    }

    validateInputs = (key) => {
        return new Promise((resolve, reject) => {
            let errors = this.state.errors;
            switch (key) {
                case "username":

                    //TODO change. Validate whether user already exists in DB.
                    if (this.usernameRegex.test(this.state.username)) {
                        delete(errors.username);
                    } else {
                        errors.username = {
                            errorMsg: <p className="RegisterForm-errorMsg">Username must be between 4-12 Characters, with no spaces.</p>
                        }
                    }
                    break;
                case "password":
                    if (this.passwordRegex.test(this.state.password)) {
                        delete(errors.password);
                    } else {
                        errors.password = {
                            errorMsg: <p className="RegisterForm-errorMsg">Password must be at least 8 characters, with 1 Uppercase and no spaces.</p>
                        }
                    }
                    break;
                case "confirmPassword":
                    if (this.state.confirmPassword === this.state.password) {
                        delete(errors.confirmPassword);
                    } else {
                        errors.confirmPassword = {
                            errorMsg: <p className="RegisterForm-errorMsg">Passwords do not match.</p>
                        }
                    }
                    break;
                default: {
                    return;
                }
            }
            this.setState({
                errors: errors,
            }, resolve);
        })
    }

    handleSubmit = event => {
        event.preventDefault();
        let status = {};
        if (this.state.username === "" || this.state.password === "" || this.state.confirmPassword === "") {
            status = {
                statusMsg: <p className="RegisterForm-statusMsg">Fields cannot be empty.</p>
            }
            this.setState({
                status: status
            });
            return;
        }

        if (Object.keys(this.state.errors).length === 0) {
            const user = {
                username: this.state.username,
            }

            fetch("http://localhost:8000/register", {
                method: "POST",
                body: JSON.stringify(user),
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            })
            .then(response => response.json())
            .then(response => {
                console.log(response);
            })


            status = {
                statusMsg: <p className="RegisterForm-statusMsg">Registration Successful! You will be redirected in 5 seconds.</p>
            }
            this.setState({
                status: status
            }, () => setTimeout(() => {
                this.props.history.push("/");
            }, 5000));
        } else {
            console.log(this.state.errors);
            status = {
                statusMsg: <p className="RegisterForm-statusMsg">Errors occured during registration. Please see below.</p>
            }
            this.setState({
                status: status,
            })
        }
    }

    handleChange = event => {
        let name = event.target.name;
        this.setState({
            [event.target.name]: event.target.value
        }, () => {
            this.validateInputs(name);
        })
    }


    render() {
        return (
            <div className="FormContainer">
                {this.state.status && this.state.status.statusMsg}
                <form className="RegisterForm" onSubmit={this.handleSubmit}>
                    <div className="RegisterForm-inputContainer">
                        <input 
                            className="RegisterForm-input"
                            type="text"
                            name="username"
                            placeholder="Username"
                            onChange={this.handleChange}
                        />

                        {this.state.errors.username && this.state.errors.username.errorMsg}
                    </div>
                    <div className="RegisterForm-inputContainer">
                        <input 
                            className="RegisterForm-input"
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={this.handleChange}
                        />
                        {this.state.errors.password && this.state.errors.password.errorMsg}
                    </div>
                    <div className="RegisterForm-inputContainer">
                        <input 
                            className="RegisterForm-input"
                            type="password"
                            name="confirmPassword"
                            placeholder="Repeat Password"
                            onChange={this.handleChange}
                        />
                        {this.state.errors.confirmPassword && this.state.errors.confirmPassword.errorMsg}
                    </div>

                    <div className="RegisterForm-inputContainer">
                        <input
                            className="RegisterForm-submitBtn"
                            type="submit" 
                        />
                    </div>
                </form>
            </div>
        )
    }
}

export default withRouter(RegisterForm);