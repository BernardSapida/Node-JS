const page404 = (req, res, next) => {
    res.render('notFound', {
        path: '404',
        pageTitle: "Not Found"
    });
};

module.exports = {
    page404: page404,
}