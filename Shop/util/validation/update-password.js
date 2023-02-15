const { body } = require('express-validator/check');
const User = require('./../../models/UserModel');

const validateSignup = () => {
    return [
        validateNewPassword(),
        validateConfirmPassword()
    ];
}

const validateNewPassword = () => {
    return [
        body('newPassword', 'The password length must be at least 12 characters long')
        .isLength({ min: 12 })
        .withMessage()
        .trim()
    ]
}

const validateConfirmPassword = () => {
    return [
        body('confirmPassword')
        .trim()
        .custom((confirmPassword, { req }) => {
            if(req.body.newPassword !== confirmPassword) {
                throw new Error('The password and confirm password didn\'t matched.');
            }
            return true;
        })
    ]
}

module.exports = validateSignup;