import React from "react";
import {Link, withRouter} from "react-router-dom";
import "./Navbar.css";

class Navbar extends React.Component {

    render() {
        return (
            <nav className="Navbar">
                {this.props.loggedStatus.isLoggedIn === true ? 
                <>
                    <ul className="Navbar-list">
                        <li className="Navbar-item"> 
                            <span className="Navbar-greeting">Hello, {this.props.loggedStatus.username}</span>
                        </li>

                        <li className="Navbar-item">
                            <button className="Navbar-logoutBtn" onClick={() => this.props.setLoggedStatus(false)}>Sign Out</button>
                        </li>
                    </ul>
                </>
                :
                <>
                <ul className="Navbar-list">
                    <li className="Navbar-item">
                        <Link to="/register" className="Navbar-link">Sign Up</Link>
                    </li>
                    <li className="Navbar-item">
                        <Link to="/login" className="Navbar-link">Log In</Link>
                    </li>
                </ul>
                </>
                }
            </nav>
        )
    }
}

export default withRouter(Navbar);