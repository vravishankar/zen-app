const Validator = require('validator');
const isEmpty = require('./is-empty');

const validateProductInput = (data) => {

    let errors = {}

    data.productName = !isEmpty(data.productName) ? data.productName : '';
    data.subproductName = !isEmpty(data.subproductName) ? data.subproductName : '';
    data.region = !isEmpty(data.region) ? data.region : '';
    data.locationName = !isEmpty(data.locationName) ? data.locationName : '';
    data.primaryBankId = !isEmpty(data.primaryBankId) ? data.primaryBankId : '';
    data.primarySupportName = !isEmpty(data.primarySupportName) ? data.primarySupportName : '';
    data.primaryDeskno = !isEmpty(data.primaryDeskno) ? data.primaryDeskno : '';
    data.primaryMobileno = !isEmpty(data.primaryMobileno) ? data.primaryMobileno : '';
    data.primaryEmailaddress = !isEmpty(data.primaryEmailaddress) ? data.primaryEmailaddress : '';
    data.countryCode = !isEmpty(data.countryCode) ? data.countryCode : '';
    data.functionId = !isNaN(data.functionId) && !isEmpty(data.functionId) ? data.functionId : errors.functionId = "Function Id must be a valid reference number"

    if(!Validator.isLength(data.productName, { max: 50 })) {
        errors.productName = "Product name cannot exceed 50 characters"
    }

    if(Validator.isEmpty(data.productName)) {
        errors.productName = "Product name is required"
    }

    if(!Validator.isLength(data.subproductName, { max: 150 })) {
        errors.subproductName = "Subproduct name cannot exceed 150 characters"
    }

    if(Validator.isEmpty(data.subproductName)) {
        errors.subproductName = "Subproduct name is required"
    }

    if(!Validator.isLength(data.locationName, { max: 50 })) {
        errors.locationName = "Location name cannot exceed 50 characters"
    }

    if(Validator.isEmpty(data.locationName)) {
        errors.locationName = "Location name is required"
    }

    if(!Validator.isLength(data.region, { max: 250 })) {
        errors.region = "Region field cannot exceed 250 characters"
    }

    if(Validator.isEmpty(data.region)) {
        errors.region = "Region is required"
    }

    if(Validator.isEmpty(data.countryCode)) {
        errors.countryCode = "Country is required"
    }

    if(!Validator.isLength(data.primaryBankId, { max: 10 })) {
        errors.primaryBankId = "Primary Bank Id cannot exceed 10 characters"
    }

    if(Validator.isEmpty(data.primaryBankId)) {
        errors.primaryBankId = "Primary Bank Id is required"
    }

    if(!Validator.isLength(data.primarySupportName, { max: 50 })) {
        errors.primarySupportName = "Primary Support Name cannot exceed 50 characters"
    }

    if(Validator.isEmpty(data.primarySupportName)) {
        errors.primarySupportName = "Primary Support Name is required"
    }

    if(!Validator.isLength(data.primarySupportName, { max: 50 })) {
        errors.primarySupportName = "Primary Support Name cannot exceed 50 characters"
    }

    if(Validator.isEmpty(data.primarySupportName)) {
        errors.primarySupportName = "Primary Support Name is required"
    }

    if(!Validator.isLength(data.primaryDeskno, { max: 25 })) {
        errors.primaryDeskno = "Primary Desk Number cannot exceed 25 characters"
    }

    if(Validator.isEmpty(data.primaryDeskno)) {
        errors.primaryDeskno = "Primary Desk Number is required"
    }

    if(!Validator.isLength(data.primaryMobileno, { max: 25 })) {
        errors.primaryMobileno = "Primary Mobile Number cannot exceed 25 characters"
    }

    if(Validator.isEmpty(data.primaryMobileno)) {
        errors.primaryMobileno = "Primary Mobile Number is required"
    }

    if(!Validator.isLength(data.primaryEmailaddress, { max: 150 })) {
        errors.primaryEmailaddress = "Primary Email address cannot exceed 25 characters"
    }

    if(Validator.isEmpty(data.primaryEmailaddress)) {
        errors.primaryEmailaddress = "Primary Email address is required"
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

module.exports = validateProductInput;