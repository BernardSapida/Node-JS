const getIndex = (req, res, next) => {
    res.render('shop/index', {
        path: '/',
        pageTitle: 'Homepage'
    })
};

module.exports = {
    getIndex: getIndex
}