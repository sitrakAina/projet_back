const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
    let errors = {};
    data.nom = !isEmpty(data.nom) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    // data.password_confirm = !isEmpty(data.password_confirm) ? data.password_confirm : '';

    if(!Validator.isLength(data.nom, { min: 2, max: 30 })) {
        errors.nom = 'nom must be between 2 to 30 chars';
    }
    
    if(Validator.isEmpty(data.nom)) {
        errors.nom = 'nom field is required';
    }

    if(!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }

    if(Validator.isEmpty(data.email)) {
        errors.email = 'Email is required';
    }

    if(!Validator.isLength(data.password, {min: 6, max: 30})) {
        errors.password = 'Password must have 6 chars';
    }

    if(Validator.isEmpty(data.password)) {
        errors.password = 'Password is required';
    }

    // if(!Validator.isLength(data.password_confirm, {min: 6, max: 30})) {
    //     errors.password_confirm = 'Password must have 6 chars';
    // }

    // if(!Validator.equals(data.password, data.password_confirm)) {
    //     errors.password_confirm = 'Password and Confirm Password must match';
    // }

    // if(Validator.isEmpty(data.password_confirm)) {
    //     errors.password_confirm = 'Password is required';
    // }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}