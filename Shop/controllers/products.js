const product_model = require('./../models/product');
const Product = product_model.product;

// /admin/admin-product => GET
const getAddProduct = (req, res, next) => {
    res.render('add-product', {
        pageTitle: 'Admin',
        path: '/add-product'
    });
};

// /admin/admin-product => POST
const postAddProduct = (req, res, next) => {
    const product = new Product(req.body.title,req.body.image,req.body.price);
    const arr = [];
    arr.push(product);
    product.save();
    res.redirect('/');
};

const getProduct = (req, res, next) => {
    Product.fetchAll(productsList => {
        res.render('shop', {
            pageTitle: 'Shop',
            productsList: productsList,
            path: '/'
        });
    });
};

module.exports = {
    getAddProduct: getAddProduct,
    postAddProduct: postAddProduct,
    getProduct: getProduct
}