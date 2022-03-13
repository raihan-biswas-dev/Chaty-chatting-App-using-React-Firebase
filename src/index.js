import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import 'semantic-ui-css/semantic.min.css';
import { getAuth } from './FirebaseConfig';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReducers } from './reducers';

const store = createStore(rootReducers, composeWithDevTools())


class Routing extends Component {
    state = {
        tracker: false
    }
    componentDidMount() {
        getAuth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ tracker: true })
            } else {
                this.setState({ tracker: false })
            }
        })
    }
    render() {
        return (
            <Router>
                { this.state.tracker  ?


                    <Routes>
                        <Route path="/" element={<App />} />
                        <Route path="/register" element={<Navigate to="/" />} />
                        <Route path="/login" element={<Navigate to="/" />} />
                    </Routes>

                    :

                    <Routes>
                        <Route path="/" element={<Navigate to="/login" />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                    </Routes>

                }

            </Router>
        )
    }
}

ReactDOM.render(<Provider store={store}><Routing /></Provider>, document.getElementById('root'));
