import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import TextLabelFieldGroup from '../common/TextLabelFieldGroup';

import { addProduct, updateProduct, getProduct } from '../../actions/product-actions';
import CountrySelectList from './CountrySelectList';
import FunctionSelectList from './FunctionSelectList';
import isEmpty from '../../validation/is-empty';

class ProductForm extends Component {
  constructor(props) {
    super(props)
    const {  product } = this.props.product
    this.state = {
      id: product ? product.id : null,
      productName: !isEmpty(product.productName) ? product.productName : '',
      subproductName: !isEmpty(product.subproductName) ? product.subproductName : '',
      region: !isEmpty(product) ? product.region : '',
      locationName: !isEmpty(product) ? product.locationName : '',
      countryCode: !isEmpty(product) ? product.countryCode : '',
      functionId: !isEmpty(product) ? product.functionId : '',
      primaryBankId: !isEmpty(product) ? product.primaryBankId : '',
      primarySupportName: !isEmpty(product) ? product.primarySupportName : '',
      primaryDeskno: !isEmpty(product) ? product.primaryDeskno : '',
      primaryMobileno: !isEmpty(product) ? product.primaryMobileno : '',
      primaryEmailaddress: !isEmpty(product) ? product.primaryEmailaddress : '',
      primaryFonenet: !isEmpty(product) ? product.primaryFonenet : '',
      secondaryBankId: !isEmpty(product) ? product.secondaryBankId : '',
      secondarySupportName: !isEmpty(product) ? product.secondarySupportName : '',
      secondaryDeskno: !isEmpty(product) ? product.secondaryDeskno : '',
      secondaryMobileno: !isEmpty(product) ? product.secondaryMobileno : '',
      secondaryEmailaddress: !isEmpty(product) ? product.secondaryEmailaddress : '',
      secondaryFonenet: !isEmpty(product) ? product.secondaryFonenet : '',
      managerBankId: !isEmpty(product) ? product.managerBankId : '',
      managerSupportName: !isEmpty(product) ? product.managerSupportName : '',
      managerDeskno: !isEmpty(product) ? product.managerDeskno : '',
      managerMobileno: !isEmpty(product) ? product.managerMobileno : '',
      managerEmailaddress: !isEmpty(product) ? product.managerEmailaddress : '',
      managerFonenet: !isEmpty(product) ? product.managerFonenet : '',
      headBankId: !isEmpty(product) ? product.headBankId : '',
      headSupportName: !isEmpty(product) ? product.headSupportName : '',
      headDeskno: !isEmpty(product) ? product.headDeskno : '',
      headMobileno: !isEmpty(product) ? product.headMobileno : '',
      headEmailaddress: !isEmpty(product) ? product.headEmailaddress : '',
      headFonenet: !isEmpty(product) ? product.headFonenet : '',  
      errors: {}
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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

  onSubmit(e) {
    e.preventDefault();
    if (this.state.id) {
      this.props.updateProduct(this.state,this.props.history);
    } else {
      this.props.addProduct(this.state,this.props.history);
    }

    // Client side validation
    // let errors = {}
    // if(this.state.productName === '') errors.productName = "Product name is required";
    // if(this.state.subproductName === '') errors.subproductName = "Subproduct name is required";
    // this.setState({ errors });
    // const isValid = Object.keys(errors).length === 0
    // if(isValid) this.props.addProduct(this.state,this.props.history);
    // End of client side validation
    //this.props.addProduct(this.state,this.props.history);
  }

  componentDidMount = () => {
    if(this.props.match.params.id) {
      this.props.getProduct(this.props.match.params.id)
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if(!isEmpty(nextProps.product.product)) {
      const { id,
              productName,
              subproductName,
              region,
              locationName,
              countryCode,
              functionId,
              primaryBankId,
              primaryMobileno,
              primaryDeskno,
              primarySupportName,
              primaryEmailaddress,
              primaryFonenet,
              secondaryBankId,
              secondaryMobileno,
              secondaryDeskno,
              secondarySupportName,
              secondaryEmailaddress,
              secondaryFonenet, 
              managerBankId,
              managerMobileno,
              managerDeskno,
              managerSupportName,
              managerEmailaddress,
              managerFonenet, 
              headBankId,
              headMobileno,
              headDeskno,
              headSupportName,
              headEmailaddress,
              headFonenet          
      } = nextProps.product.product

      this.setState({
          id,
          productName,
          subproductName,
          region,
          locationName,
          countryCode,
          functionId,
          primaryBankId,
          primaryMobileno,
          primaryDeskno,
          primarySupportName,
          primaryEmailaddress,
          primaryFonenet,
          secondaryBankId,
          secondaryMobileno,
          secondaryDeskno,
          secondarySupportName,
          secondaryEmailaddress,
          secondaryFonenet, 
          managerBankId,
          managerMobileno,
          managerDeskno,
          managerSupportName,
          managerEmailaddress,
          managerFonenet, 
          headBankId,
          headMobileno,
          headDeskno,
          headSupportName,
          headEmailaddress,
          headFonenet
      })
    }
    if(nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }
  }

  render() {
    const { errors } = this.state;
    return (

              <form noValidate onSubmit={this.onSubmit}>
                <h1 className="display-text">{this.props.match.params.id ? 'Edit' : 'Add'} Product</h1>
                <hr />
                <small className="d-block pb-1">Please note items marked with * are required fields</small>
                { Object.keys(errors).length !== 0 
                    && <div className="alert alert-danger mb-1">
                          Errors Found. Please correct and resubmit the form.
                       </div> 
                }
                <div className="form-row">
                  <div className="col">
                    <TextLabelFieldGroup 
                      placeholder="Product Name*"
                      label="Product Name"
                      name="productName"
                      value={this.state.productName}
                      onChange={this.onChange}
                      error={errors.productName}
                    />
                  </div>
                  <div className="col">
                    <TextLabelFieldGroup 
                      placeholder="Subproduct Name*"
                      label="Subproduct Name"
                      name="subproductName"
                      value={this.state.subproductName}
                      onChange={this.onChange}
                      error={errors.subproductName}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="col">
                    <TextLabelFieldGroup 
                      placeholder="Region*"
                      label="Region"
                      name="region"
                      value={this.state.region}
                      onChange={this.onChange}
                      error={errors.region}
                    />
                    </div>
                  <div className="col">
                    <TextLabelFieldGroup 
                      placeholder="Location Name*"
                      label="Location Name"
                      name="locationName"
                      value={this.state.locationName}
                      onChange={this.onChange}
                      error={errors.locationName}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="col">
                    <CountrySelectList 
                      value={this.state.countryCode}
                      onChange={this.onChange}
                      error={errors.countryCode}
                    />
                  </div>
                  <div className="col">
                    <FunctionSelectList 
                      value={this.state.functionId}
                      onChange={this.onChange}
                      error={errors.functionId}                    
                    />
                  </div>
                </div>
                <fieldset className="border p-2">
                  <legend className="w-auto">Primary Support</legend>
                  <div className="form-row">
                    <div className="col-4">
                      <TextLabelFieldGroup 
                        placeholder="Primary Support - Bank Id*"
                        label="Bank Id"
                        name="primaryBankId"
                        value={this.state.primaryBankId}
                        onChange={this.onChange}
                        error={errors.primaryBankId}
                      />
                    </div>
                    <div className="col-8">
                      <TextLabelFieldGroup 
                        placeholder="Primary Support Name*"
                        label="Support Name"
                        name="primarySupportName"
                        value={this.state.primarySupportName}
                        onChange={this.onChange}
                        error={errors.primarySupportName}
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="col">
                      <TextLabelFieldGroup 
                        placeholder="Primary Support - Mobile No*"
                        label="Mobile Number"
                        name="primaryMobileno"
                        value={this.state.primaryMobileno}
                        onChange={this.onChange}
                        error={errors.primaryMobileno}
                      />
                    </div>
                    <div className="col">
                      <TextLabelFieldGroup 
                        placeholder="Primary Support - Desk No*"
                        label="Desk Number"
                        name="primaryDeskno"
                        value={this.state.primaryDeskno}
                        onChange={this.onChange}
                        error={errors.primaryDeskno}
                      />
                    </div>
                    <div className="col">
                      <TextLabelFieldGroup 
                        placeholder="Primary Support - Fonenet"
                        label="Fonenet"
                        name="primaryFonenet"
                        value={this.state.primaryFonenet}
                        onChange={this.onChange}
                        error={errors.primaryFonenet}
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="col">
                      <TextLabelFieldGroup 
                        placeholder="Primary Email address*"
                        label="Email Address"
                        name="primaryEmailaddress"
                        value={this.state.primaryEmailaddress}
                        onChange={this.onChange}
                        error={errors.primaryEmailaddress}
                      />
                    </div>
                  </div>
                </fieldset>

                <fieldset className="border p-2">
                  <legend className="w-auto">Secondary Support</legend>
                  <div className="form-row">
                    <div className="col-4">
                      <TextLabelFieldGroup 
                        placeholder="Secondary Support - Bank Id*"
                        label="Bank Id"
                        name="secondaryBankId"
                        value={this.state.secondaryBankId}
                        onChange={this.onChange}
                        error={errors.secondaryBankId}
                      />
                    </div>
                    <div className="col-8">
                      <TextLabelFieldGroup 
                        placeholder="Secondary Support Name*"
                        label="Support Name"
                        name="secondarySupportName"
                        value={this.state.secondarySupportName}
                        onChange={this.onChange}
                        error={errors.secondarySupportName}
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="col">
                      <TextLabelFieldGroup 
                        placeholder="Secondary Support - Mobile No*"
                        label="Mobile Number"
                        name="secondaryMobileno"
                        value={this.state.secondaryMobileno}
                        onChange={this.onChange}
                        error={errors.secondaryMobileno}
                      />
                    </div>
                    <div className="col">
                      <TextLabelFieldGroup 
                        placeholder="Secondary Support - Desk No*"
                        label="Desk Number"
                        name="secondaryDeskno"
                        value={this.state.secondaryDeskno}
                        onChange={this.onChange}
                        error={errors.secondaryDeskno}
                      />
                    </div>
                    <div className="col">
                      <TextLabelFieldGroup 
                        placeholder="Secondary Support - Fonenet"
                        label="Fonenet"
                        name="secondaryFonenet"
                        value={this.state.secondaryFonenet}
                        onChange={this.onChange}
                        error={errors.secondaryFonenet}
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="col">
                      <TextLabelFieldGroup 
                        placeholder="Secondary Email address*"
                        label="Email Address"
                        name="secondaryEmailaddress"
                        value={this.state.secondaryEmailaddress}
                        onChange={this.onChange}
                        error={errors.secondaryEmailaddress}
                      />
                    </div>
                  </div>
                </fieldset>
                <fieldset className="border p-2">
                  <legend className="w-auto">Manager</legend>
                  <div className="form-row">
                    <div className="col-4">
                      <TextLabelFieldGroup 
                        placeholder="Manager - Bank Id*"
                        label="Bank Id"
                        name="managerBankId"
                        value={this.state.managerBankId}
                        onChange={this.onChange}
                        error={errors.managerBankId}
                      />
                    </div>
                    <div className="col-8">
                      <TextLabelFieldGroup 
                        placeholder="Manager Name*"
                        label="Manager Name"
                        name="managerSupportName"
                        value={this.state.managerSupportName}
                        onChange={this.onChange}
                        error={errors.managerSupportName}
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="col">
                      <TextLabelFieldGroup 
                        placeholder="Manager - Mobile No*"
                        label="Mobile Number"
                        name="managerMobileno"
                        value={this.state.managerMobileno}
                        onChange={this.onChange}
                        error={errors.managerMobileno}
                      />
                    </div>
                    <div className="col">
                      <TextLabelFieldGroup 
                        placeholder="Manager - Desk No*"
                        label="Desk Number"
                        name="managerDeskno"
                        value={this.state.managerDeskno}
                        onChange={this.onChange}
                        error={errors.managerDeskno}
                      />
                    </div>
                    <div className="col">
                      <TextLabelFieldGroup 
                        placeholder="Manager - Fonenet"
                        label="Fonenet"
                        name="managerFonenet"
                        value={this.state.managerFonenet}
                        onChange={this.onChange}
                        error={errors.managerFonenet}
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="col">
                      <TextLabelFieldGroup 
                        placeholder="Manager Email address*"
                        label="Email Address"
                        name="managerEmailaddress"
                        value={this.state.managerEmailaddress}
                        onChange={this.onChange}
                        error={errors.managerEmailaddress}
                      />
                    </div>
                  </div>
                </fieldset>
                <fieldset className="border p-2">
                  <legend className="w-auto">Department Head</legend>
                  <div className="form-row">
                    <div className="col-4">
                      <TextLabelFieldGroup 
                        placeholder="Head - Bank Id*"
                        label="Bank Id"
                        name="headBankId"
                        value={this.state.headBankId}
                        onChange={this.onChange}
                        error={errors.headBankId}
                      />
                    </div>
                    <div className="col-8">
                      <TextLabelFieldGroup 
                        placeholder="Head Name*"
                        label="Manager Name"
                        name="headSupportName"
                        value={this.state.headSupportName}
                        onChange={this.onChange}
                        error={errors.headSupportName}
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="col">
                      <TextLabelFieldGroup 
                        placeholder="Head - Mobile No*"
                        label="Mobile Number"
                        name="headMobileno"
                        value={this.state.headMobileno}
                        onChange={this.onChange}
                        error={errors.headMobileno}
                      />
                    </div>
                    <div className="col">
                      <TextLabelFieldGroup 
                        placeholder="Head - Desk No*"
                        label="Desk Number"
                        name="headDeskno"
                        value={this.state.headDeskno}
                        onChange={this.onChange}
                        error={errors.headDeskno}
                      />
                    </div>
                    <div className="col">
                      <TextLabelFieldGroup 
                        placeholder="Head - Fonenet"
                        label="Fonenet"
                        name="headFonenet"
                        value={this.state.headFonenet}
                        onChange={this.onChange}
                        error={errors.headFonenet}
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="col">
                      <TextLabelFieldGroup 
                        placeholder="Head Email address*"
                        label="Email Address"
                        name="headEmailaddress"
                        value={this.state.headEmailaddress}
                        onChange={this.onChange}
                        error={errors.headEmailaddress}
                      />
                    </div>
                  </div>
                </fieldset>                
                <button className = "btn btn-md btn-primary mt-3" type="submit">Save Product</button>
              </form>

    )
  }
}

ProductForm.propTypes = {
  addProduct: PropTypes.func.isRequired,
  updateProduct: PropTypes.func.isRequired,
  getProduct: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
}

function mapStateToProps(state,props) {

    return {
      product: state.product,
      errors: state.errors
    }
}

export default connect(mapStateToProps, { addProduct, updateProduct, getProduct })(withRouter(ProductForm));