const Validator = require('validator');
const isEmpty = require('./is-empty');

const validateRegisterInput = (data) => {

    let errors = {}
    
    data.bankId = !isEmpty(data.bankId) ? data.bankId : ''
    data.name = !isEmpty(data.name) ? data.name : ''
    data.email = !isEmpty(data.email) ? data.email : ''
    data.password = !isEmpty(data.password) ? data.password : ''
    data.password2 = !isEmpty(data.password2) ? data.password2 : ''

    if(!Validator.isLength(data.bankId, { min: 7, max: 7})) {
        errors.bankId = "Bank Id must be 7 characters"
    }

    if(Validator.isEmpty(data.bankId)) {
        errors.bankId = "Bank Id is required"
    }

    if(Validator.isEmpty(data.name)) {
        errors.name = "User name is required"
    }

    if(!Validator.isEmail(data.email)) {
        errors.email = "Email is not valid"
    }

    if(Validator.isEmpty(data.email)) {
        errors.email = "Email is required"
    }

    if(!Validator.isLength(data.password, { min: 8, max: 15})) {
        errors.password = "Password must be between 8 to 15 characters"
    }

    if(Validator.isEmpty(data.password)) {
        errors.password = "Password is required"
    }

    if(Validator.isEmpty(data.password2)) {
        errors.password2 = "Confirm Password is required"
    }

    if(!Validator.equals(data.password, data.password2)) {
        errors.password2 = "Passwords must match"
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

module.exports = validateRegisterInput;