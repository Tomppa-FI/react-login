import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";

class Navbar extends React.Component {
    render() {
        return (
            <Router>
                <nav className="Navbar">
                    <ul>
                        <li>
                            <Link to="/register">Sign Up</Link>
                        </li>
                        <li>
                            <Link to="/login">Log In</Link>
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