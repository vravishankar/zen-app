import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ auth, component: Component, ...rest}) => (
    <Route
        { ...rest}
        render={props => auth.isAuthenticated === true ? (<Component {...props} />) : (<Redirect to="/login"/>)}
    />
);

PrivateRoute.propTypes = {
    component: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps,null,null,{pure: false})(PrivateRoute);