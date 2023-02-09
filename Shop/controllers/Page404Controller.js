const page404 = (req, res, next) => {
    res.render('notFound', {
        pageTitle: 'Not Found',
        isAuthenticated: req.session.isAuthenticated,
        path: '404'
    });
};

module.exports = {
    page404,
}