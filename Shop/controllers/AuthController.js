const UserModel = require('./../models/UserModel');
const User = UserModel.User;
const bcrypt = require('bcryptjs');

const getSignin = (req, res, next) => {
    res.render('auth/signin', {
        pageTitle: 'Sign In',
        isAuthenticated: false,
        path: '/signin'
    });
}

const postSignin = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findOne({ email: email });

    if(user) {
        const isMatched = await bcrypt.compare(password, user.password);
        if(isMatched) {
            req.session.user = user;
            req.session.isAuthenticated = true;
            req.session.save(() => res.redirect('/'));
        }
    }
}

const getSignup = (req, res, next) => {
    res.render('auth/signup', {
        pageTitle: 'Sign In',
        isAuthenticated: false,
        path: '/signin'
    });
}

const postSignup = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const user = await User.findOne({ email: email })

    if(!user) {
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = new User({
             email: email,
             password: hashedPassword,
             cart: { items: [] }
        });

        newUser.save();
    }

    res.redirect('/signin');
}

const postSignout = async (req, res, next) => {
    req.session.destroy(() => res.redirect('/signin'));
}

module.exports = { getSignin,  postSignin, postSignout, getSignup, postSignup };