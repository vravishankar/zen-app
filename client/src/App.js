import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/set-auth-token';
import { setCurrentUser, logoutUser } from './actions/auth-actions';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';

import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Home from './components/layout/Home';
import PrivateRoute from './components/routes/PrivateRoute';

import './App.css';


if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded))

  // check for token expiry
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser())

    // Redirect to login
    window.location.href = '/login'
  }

}

class App extends Component {
  render() {
    return (
      <Provider store={ store }>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component= { Landing }/>
            <div className="container-fluid">
              <Route exact path="/login" component = { Login }/>
              <Route exact path="/register" component = { Register }/>
              <PrivateRoute path="/home" component = { Home }/>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
