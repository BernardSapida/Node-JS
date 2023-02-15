const page404 = (req, res, next) => {
    res.render('notFound', {
        pageTitle: 'Not Found',
        path: '404'
    });
};

module.exports = page404;