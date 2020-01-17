import React from "react";
import "./RegisterForm.css";

class RegisterForm extends React.Component {
    constructor() {
        super();
        this.state = {
            username: "",
            hash: "",
            errors: {}, 
        }
    }
    handleSubmit = () => {

    }

    handleChange = event => {

    }
    render() {
        return (
            <div className="FormContainer">
                {this.state.errors.status && this.state.errors.status.errorMsg}
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

export default RegisterForm;