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
            mainDisplay: undefined
        }
    }

    setMainDisplay = component => {
        this.setState({
            mainDisplay: component
        })
    }

    render() {
        return (
            <div className="App">
                <Router>
                    <Navbar />
                    <Switch>
                        <Route path="/register">
                            <RegisterForm />
                        </Route>
                        <Route path="/login">
                            <LoginForm />
                        </Route>
                    </Switch>
                </Router>
            </div>
        )
    }
}

export default App;
