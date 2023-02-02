const getCart = (req, res, next) => {
    console.log(1);
    res.render('shop/cart', {
        pageTitle: 'My cart',
        path: '/cart'
    });
};

module.exports = {
    getCart: getCart
}