const UserModel = require('./../models/UserModel');
const User = UserModel.User;

const getSignin = (req, res, next) => {
    res.render('auth/signin', {
        pageTitle: 'Sign In',
        isAuthenticated: false,
        path: '/signin'
    });
}

const postSignin = async (req, res, next) => {
    const user = await User.findById('63e2fe5f2b753602e86f618a');
    req.session.user = user;
    req.session.isAuthenticated = true;
    req.session.save(err => {
        if(err) console.log(err);
        res.redirect('/');
    });
}

const postSignout = async (req, res, next) => {
    req.session.destroy((err) => {
        if(err) console.log(err);
        res.redirect('/signin');
    });
}

module.exports = { getSignin,  postSignin, postSignout };