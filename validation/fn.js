const Validator = require('validator');
const isEmpty = require('./is-empty');

const validateFunctionInput = (data) => {

    let errors = {}

    data.name = !isEmpty(data.name) ? data.name : '';

    if(!Validator.isLength(data.name, { max: 50 })) {
        errors.name = "Function name cannot exceed 50 characters"
    }

    if(Validator.isEmpty(data.name)) {
        errors.name = "Function name is required"
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

module.exports = validateFunctionInput;