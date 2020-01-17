import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import "./Navbar.css";

class Navbar extends React.Component {
    render() {
        return (
            <Router>
                <nav className="Navbar">
                    <ul className="Navbar-list">
                        <li className="Navbar-item">
                            <Link to="/register" className="Navbar-link">Sign Up</Link>
                        </li>
                        <li className="Navbar-item">
                            <Link to="/login" className="Navbar-link">Log In</Link>
                        </li>
                    </ul>
                </nav>
                <Switch>
                    <Route path="/register">
                        <RegisterForm />
                    </Route>
                    <Route path="/login">
                        <LoginForm />
                    </Route>
                </Switch>
            </Router>
        )
    }
}

export default Navbar;