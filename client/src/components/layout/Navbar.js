import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logoutUser } from '../../actions/auth-actions';

class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();
    this.props.history.push('/login');
  }

  render() {

    const { isAuthenticated } = this.props.auth;

    const authLinks = (

            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/home">Home</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="" onClick={this.onLogoutClick.bind(this)}>Logout</Link>
                </li>
            </ul>
    )

    const guestLinks = (
        <ul className="navbar-nav">
            <li className="nav-item">
                <Link className="nav-link" to="/register">Register</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
            </li>
        </ul>
    )

    return (
      <nav className = "navbar navbar-expand-lg fixed-top navbar-dark bg-dark mb-4">
        
            <Link className="navbar-brand" to="/">Zen</Link>
            <button className= "navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                <span className= "navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="mobile-nav">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/help">Help</Link>
                    </li>
                </ul>
                {isAuthenticated ? authLinks : guestLinks}
            </div>
        
      </nav>
    )
  }
}

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(withRouter(Navbar));