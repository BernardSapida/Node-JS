const UserModel = require('./../models/UserModel');
const User = UserModel.User;
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const sendgridTransaport = require('nodemailer-sendgrid-transport');
const transporter = nodemailer.createTransport(sendgridTransaport({
    auth: {
        api_key: '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'
    }
}))

const getSignin = (req, res, next) => {
    res.render('auth/signin', {
        pageTitle: 'Sign In',
        isAuthenticated: false,
        error: req.flash('error'),
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

    req.flash('error', 'Incorrect email address or password!');
    res.redirect('/signin');
}

const getSignup = (req, res, next) => {
    res.render('auth/signup', {
        pageTitle: 'Sign In',
        isAuthenticated: false,
        error: req.flash('error'),
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
        res.redirect('/signin');
        transporter.sendMail({
            to: email,
            from: 'shop@sendgrid.net',
            subject: 'Account successfully created!',
            html: '<h1>Account successfully created!</h1>'
        })
    } else request.flash('error', 'Email already exists!');

    res.redirect('/signin');
}

const postSignout = async (req, res, next) => {
    req.session.destroy(() => {
        res.redirect('/signin');
    });
}

module.exports = { getSignin,  postSignin, postSignout, getSignup, postSignup };