import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { loginUser } from "../../actions/auth-actions";
import TextFieldGroup from "../common/TextFieldGroup";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      bankId: "",
      password: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();

    // Validate
    let errors = {}
    if(this.state.bankId === '') errors.bankId = "Bank Id is required";
    if(this.state.password === '') errors.password = "Password is required";
    this.setState({ errors });
    const isValid = Object.keys(errors).length === 0
    
    const user = {
      bankId: this.state.bankId,
      password: this.state.password
    };
    if(isValid) this.props.loginUser(user);
  }

  onChange(e) {
    if(!!this.state.errors[e.target.name]) {
      let  errors = Object.assign({}, this.state.errors);
      delete errors[e.target.name];
      this.setState({ 
        [e.target.name]: e.target.value,
        errors 
      });
    } else {
      this.setState({ [e.target.name]: e.target.value})
    }
  }

  componentDidMount() {
      if(this.props.auth.isAuthenticated) {
          this.props.history.push('/home')
      }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/home");
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-6 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">Login to your account</p>
              <form noValidate onSubmit={this.onSubmit}>
                  <TextFieldGroup 
                    placeholder="Bank ID"
                    type="text"
                    name="bankId"
                    value={this.state.bankId}
                    onChange={this.onChange}
                    error={errors.bankId}
                  />
                  <TextFieldGroup 
                    placeholder="Password"
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                    error={errors.password}
                  />
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(withRouter(Login));
