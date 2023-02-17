const User = require('./../models/UserModel');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const { validationResult } = require('express-validator');

const getSignin = (req, res, next) => {
    res.render('auth/signin', {
        pageTitle: 'Sign In',
        email: '',
        password: '',
        error: req.flash('error'),
        path: '/signin'
    });
}

const postSignin = async (req, res, next) => {
    const { email, password } = req.body;
    const errors = validationResult(req);
    const user = await User.findOne({ email: email.toLowerCase() });

    if(!errors.isEmpty()) {
        req.flash('error', errors.array()[0].msg);

        return res.status(422).render('auth/signin', {
            pageTitle: 'Sign In',
            email: email,
            password: password,
            error: req.flash('error'),
            path: '/signin'
        });
    }

    req.session.user = user;
    req.session.isAuthenticated = true;
    req.session.save(() => res.redirect('/'));
}

const getResetPassword = (req, res, next) => {
    res.render('auth/reset', {
        pageTitle: 'Reset Password',
        error: req.flash('error'),
        path: '/reset-password'
    });
}

const postResetPassword = (req, res, next) => {
    const { email } = req.body;

    crypto.randomBytes(32, async (error, buffer) => {
        if(error) {
            console.error(error);
            return res.redirect('/reset-password');
        }

        const token = buffer.toString('hex');
        const user = await User.findOne({ email: email });

        if(!user) {
            req.flash('error', 'Email didn\'t exist!');
            return res.redirect('/reset-password');
        }

        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 3600000;
        await user.save();
        res.redirect('/');

        // sendMail(
        //     email, 
        //     'Reset Password', 
        //     'Reset Password', 
        //     `
        //         <p>You requested a password reset.</p>
        //         <p>Click this <a href="http://localhost:3000/reset-password/${token}">link</a> to set a new password.</p>
        //     `
        // );
    });
}

const getUpdatePassword = async (req, res, next) => {
    const token = req.params.token;

    const user = await User.findOne({ 
        resetToken: token, 
        resetTokenExpiration: { $gt: Date.now() } 
    });

    if(!user) return res.redirect('/');

    res.render('auth/update-password', {
        pageTitle: 'Update Password',
        newPassword: '',
        confirmPassword: '',
        passwordToken: token,
        userId: user._id.toString(),
        error: req.flash('error'),
        path: '/update-password'
    });
    
    
}

const postUpdatePassword = async (req, res, next) => {
    const { newPassword, confirmPassword, userId, passwordToken } = req.body;
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        req.flash('error', errors.array()[0].msg);

        return res.status(422).render('auth/update-password', {
            pageTitle: 'Update Password',
            newPassword: newPassword,
            confirmPassword: confirmPassword,
            passwordToken: passwordToken,
            userId: userId,
            error: req.flash('error'),
            path: '/reset-password'
        });
    }

    const user = await User.findOne({ 
        resetToken: passwordToken, 
        resetTokenExpiration: { $gt: Date.now() },
        _id: userId 
    });

    if(!user) res.redirect('/');

    if(newPassword == confirmPassword) {
        const hashedPassword = await bcrypt.hash(newPassword, 12);
        user.password = hashedPassword;
        user.resetToken = undefined;
        user.resetTokenExpiration = undefined;
        user.save();
        res.redirect('/signin');
    }
}

const getSignup = (req, res, next) => {
    res.render('auth/signup', {
        pageTitle: 'Sign In',
        email: '',
        password: '',
        confirmPassword: '',
        error: req.flash('error'),
        path: '/signin'
    });
}

const postSignup = async (req, res, next) => {
    const { email, password, confirmPassword } = req.body;
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        req.flash('error', errors.array()[0].msg);

        return res.status(422).render('auth/signup', {
            pageTitle: 'Sign Up',
            email: email,
            password: password,
            confirmPassword: confirmPassword,
            error: req.flash('error'),
            path: '/signup'
        });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
         email: email.toLowerCase(),
         password: hashedPassword,
         cart: { items: [] }
    });

    newUser.save();
    res.redirect('/signin');

    // sendMail(
    //     email, 
    //     'Account successfully created!', 
    //     'Account successfully created!', 
    //     '<p>Account successfully created!</p>'
    // );
}

const postSignout = async (req, res, next) => {
    req.session.destroy(() => {
        res.redirect('/signin');
    });
}

const sendMail = (email, subject = 'Subject', text = 'Hello World!', html) => {
    const mailTransporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        requireTLS: true,
        secure: true,
        service: 'gmail',
        auth: {
            user: 'burgerhub.service@gmail.com',
            pass: process.env.APP_PASSWORD
        }
    })

    const data = {
        to: email,
        from: 'burgerhub.service@gmail.com',
        subject: subject,
        text: text,
        html: html
    };
    
    mailTransporter.sendMail(data);
}

module.exports = { 
    getSignin,  
    postSignin, 
    getResetPassword,
    postResetPassword,
    getUpdatePassword,
    postUpdatePassword,
    getSignup, 
    postSignup,
    postSignout
};