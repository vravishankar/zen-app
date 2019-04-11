import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/auth-actions';
import TextFieldGroup from '../common/TextFieldGroup';

class Register extends Component {

  constructor() {
      super()
      this.state = {
          bankId:'',
          name:'',
          email:'',
          password:'',
          password2:'',
          errors: {}
      }
      this.onChange = this.onChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit(e) {
      e.preventDefault();

      const newUser = {
          bankId: this.state.bankId,
          name: this.state.name,
          email: this.state.email,
          password: this.state.password,
          password2: this.state.password2
      }

      this.props.registerUser(newUser,this.props.history)
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.errors) {
        this.setState({
            errors: nextProps.errors
        })
    }
  }

  render() {
    const { errors } = this.state
    return (
        <div className="register">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 m-auto">
                        <h1 className="display-name-4 text-center">Register</h1>
                        <p className="lead text-center">Register for a new account</p>
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
                                placeholder="Full Name"
                                type="text"
                                name="name"
                                value={this.state.name}
                                onChange={this.onChange}
                                error={errors.name}
                            />                            
                            <TextFieldGroup 
                                placeholder="Email Address"
                                type="email"
                                name="email"
                                value={this.state.email}
                                onChange={this.onChange}
                                error={errors.email}
                            />
                            <TextFieldGroup 
                                placeholder="Password"
                                type="password"
                                name="password"
                                value={this.state.password}
                                onChange={this.onChange}
                                error={errors.password}
                            />
                            <TextFieldGroup 
                                placeholder="Confirm Password"
                                type="password"
                                name="password2"
                                value={this.state.password2}
                                onChange={this.onChange}
                                error={errors.password2}
                            />
                            <input type="submit" className="btn btn-block btn-info mt-4" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
  }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
})

export default connect(mapStateToProps,{ registerUser })(withRouter(Register));