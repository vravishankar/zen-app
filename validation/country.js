const Validator = require('validator');
const isEmpty = require('./is-empty');

const validateCountryInput = (data) => {

    let errors = {}

    data.code = !isEmpty(data.code) ? data.code : '';
    data.name = !isEmpty(data.name) ? data.name : '';

    if(!Validator.isLength(data.code, { min: 2, max: 2})) {
        errors.code = "Enter a valid ISO country code"
    }

    if(Validator.isEmpty(data.code)) {
        errors.code = "Country code is required"
    }

    if(!Validator.isLength(data.name, { max: 50 })) {
        errors.name = "Country name cannot exceed 50 characters"
    }

    if(Validator.isEmpty(data.name)) {
        errors.name = "Country name is required"
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

module.exports = validateCountryInput;