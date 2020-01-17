import React from "react";
import {Link} from "react-router-dom";
import "./Navbar.css";

class Navbar extends React.Component {
    render() {
        return (
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
        )
    }
}

export default Navbar;