const getLogin = (req, res, next) => {
    res.render('auth/login', {
        pageTitle: 'Login',
        path: '/login'
    });
}

const postLogin = (req, res, next) => {

}

module.exports = { getLogin,  postLogin }