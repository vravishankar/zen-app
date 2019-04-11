import React, { Component } from "react";

import TextLabelFieldGroup from "../common/TextLabelFieldGroup";
import isEmpty from "../../validation/is-empty";

class FuncForm extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    const { func } = this.props;
    this.state = {
      mode: !isEmpty(func) ? "edit" : "add",
      id: !isEmpty(func.id) ? func.id : "",
      name: !isEmpty(func.name) ? func.name : "",
      errors: !isEmpty(this.props.errors) ? this.props.errors : {},
      loading: false
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (!isEmpty(nextProps.func)) {
      this.setState({
        mode: "edit",
        id: nextProps.func.id,
        name: nextProps.func.name
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
    this.props.saveFunction(this.state);
  };

  render() {
    const { errors } = this.state;
    return (
      <form noValidate onSubmit={this.handleSubmit}>
        <h1 className="display-text">
          {this.state.mode === "edit" ? "Edit" : "Add"} Function
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
              placeholder="Id - Auto Sequence"
              label="Function Id"
              name="id"
              value={this.state.id}
              onChange={this.handleChange}
              error={errors.id}
              disabled={true}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="col">
            <TextLabelFieldGroup
              placeholder="Name *"
              label="Function Name"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
              error={errors.name}
            />
          </div>
        </div>
        <button className="btn btn-md btn-primary mt-3" type="submit">
          Save Function
        </button>
      </form>
    );
  }
}
export default FuncForm;
