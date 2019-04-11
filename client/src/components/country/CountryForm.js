import React, { Component } from "react";

import TextLabelFieldGroup from "../common/TextLabelFieldGroup";
import isEmpty from "../../validation/is-empty";

class CountryForm extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    const { country } = this.props;
    this.state = {
      mode: !isEmpty(country) ? "edit" : "add",
      code: !isEmpty(country.code) ? country.code : "",
      name: !isEmpty(country.name) ? country.name : "",
      errors: !isEmpty(this.props.errors) ? this.props.errors : {},
      loading: false
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (!isEmpty(nextProps.country)) {
      this.setState({
        mode: "edit",
        code: nextProps.country.code,
        name: nextProps.country.name
      });
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  handleChange = e => {
    if (!!this.state.errors[e.target.name]) {
      let errors = Object.assign({}, this.state.errors);
      delete errors[e.target.name];
      this.setState({
        [e.target.name]: e.target.value,
        errors
      });
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.saveCountry(this.state);
  };

  render() {
    const { errors } = this.state;
    return (
      <form noValidate onSubmit={this.handleSubmit}>
        <h1 className="display-text">
          {this.state.mode === "edit" ? "Edit" : "Add"} Country
        </h1>
        <hr />
        <small className="d-block pb-1">
          Please note items marked with * are required fields
        </small>
        {Object.keys(errors).length !== 0 && (
          <div className="alert alert-danger mb-1">Error: {errors.message}</div>
        )}
        <div className="form-row">
          <div className="col">
            <TextLabelFieldGroup
              placeholder="Code *"
              label="Country Code"
              name="code"
              value={this.state.code}
              onChange={this.handleChange}
              error={errors.code}
              disabled={this.state.mode === "edit" ? true : false}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="col">
            <TextLabelFieldGroup
              placeholder="Name *"
              label="Country Name"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
              error={errors.name}
            />
          </div>
        </div>
        <button className="btn btn-md btn-primary mt-3" type="submit">
          Save Country
        </button>
      </form>
    );
  }
}
export default CountryForm;
