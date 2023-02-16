const page404 = (req, res, next) => {
    console.log(404)
    res.status(404).render('notFound', {
        pageTitle: 'Not Found',
        path: '404'
    });
};

module.exports = page404;