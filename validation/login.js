const Validator = require('validator');
const isEmpty = require('./is-empty');

const validateLoginInput = (data) => {

    let errors = {}

    data.bankId = !isEmpty(data.bankId) ? data.bankId : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    if(!Validator.isLength(data.bankId, { min: 7, max: 7})) {
        errors.bankId = "Bank Id is invalid"
    }

    if(Validator.isEmpty(data.bankId)) {
        errors.bankId = "Bank Id is required"
    }

    if(Validator.isEmpty(data.password)) {
        errors.password = "Password is required"
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

module.exports = validateLoginInput;