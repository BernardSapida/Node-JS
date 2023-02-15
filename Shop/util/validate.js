const signupValidation = require('./validation/signup');
const signinValidation = require('./validation/signin');
const productValidation = require('./validation/add-product');
const passwordValidation = require('./validation/update-password');

const pages = {
    'signup': signupValidation,
    'signin': signinValidation,
    'products': productValidation,
    'updatePassword': passwordValidation
}

module.exports = pages;