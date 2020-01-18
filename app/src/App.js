import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import Navbar from "./components/Navbar";
import './App.css';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            loggedStatus: {
                username: undefined,
                isLoggedIn: undefined,
            }
        }
    }

    componentDidMount() {
        let username = undefined;
        let isLoggedIn = undefined;
        if (localStorage.getItem("jwt")) {
            fetch("https://localhost:8000/user", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("jwt")}`
                }
            }).then(response => response.json()).then(response => {
                if (response.success) {
                    username = response.username;
                    isLoggedIn = true;
                } else {
                    username = undefined;
                    isLoggedIn = false;
                    localStorage.removeItem("jwt");
                }

                this.setState({
                    loggedStatus: {
                        username: username,
                        isLoggedIn: isLoggedIn
                    }
                })
            })
        }
    }

    setLoggedStatus = (val, username, token) => {
        if (val) {
            localStorage.setItem("jwt", token);
            this.setState({
                loggedStatus: {
                    username: username,
                    isLoggedIn: true,
                }
            })
        } else {
            localStorage.removeItem("jwt")
            this.setState({
                loggedStatus: {
                    username: undefined,
                    isLoggedIn: false,
                }
            }) 
        }
    }

    render() {
        return (
            <div className="App">
                <Router>
                    <Navbar loggedStatus={this.state.loggedStatus} setLoggedStatus={this.setLoggedStatus}/>
                    <Switch>
                        <Route path="/register">
                            <RegisterForm />
                        </Route>
                        <Route path="/login">
                            <LoginForm setLoggedStatus={this.setLoggedStatus}/>
                        </Route>
                    </Switch>
                </Router>
            </div>
        )
    }
}

export default App;
