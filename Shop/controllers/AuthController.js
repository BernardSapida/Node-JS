const getSignin = (req, res, next) => {
    res.render('auth/signin', {
        pageTitle: 'Sign In',
        path: '/signin'
    });
}

const postSignin = (req, res, next) => {

}

module.exports = { getSignin,  postSignin }