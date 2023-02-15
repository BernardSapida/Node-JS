const signupValidation = require('./validation/signup');
const signinValidation = require('./validation/signin');
const productValidation = require('./validation/add-product');

const pages = {
    'signup': signupValidation,
    'signin': signinValidation,
    'products': productValidation
}

module.exports = pages;