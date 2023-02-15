const { body } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const User = require('./../../models/UserModel');

const validateSignin = () => {
    return [
        validateEmail(),
        validatePassword()
    ];
}

const validateEmail = () => {
    return [
        body('email')
        .isEmail()
        .withMessage('Please enter a valid email!')
        .normalizeEmail()
        .custom(async (email, { req }) => {
            const { password } = req.body;
            const user = await User.findOne({ email: email });
            const matchedPassword = await bcrypt.compare(password, user.password);

            if(!user || !matchedPassword) {
                throw new Error('Incorrect email address or password!');
            }
            
            return true;
        })
    ]
}

const validatePassword = () => {
    return [
        body('password', 'The password length must be at least 12 characters long')
        .isLength({ min: 12 })
        .withMessage()
        .trim()
    ]
}

module.exports = validateSignin;