const UserModel = require('./../models/UserModel');
const User = UserModel.User;
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

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
            return req.session.save(() => res.redirect('/'));
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

        if(password === confirmPassword) {
            newUser.save();
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
                subject: 'Signup successfully!',
                text: 'Hello World!',
                html: '<h1>Account successfully created!</h1>'
            };
            
            res.redirect('/signin');
            // mailTransporter.sendMail(data);
        } else {
            req.flash('error', 'Password and confirm password didn\'t matched');
            res.redirect('/signup');
        }
    } else {
        req.flash('error', 'Email already exists!');
        res.redirect('/signup');
    }
}

const postSignout = async (req, res, next) => {
    req.session.destroy(() => {
        res.redirect('/signin');
    });
}

module.exports = { getSignin,  postSignin, postSignout, getSignup, postSignup };