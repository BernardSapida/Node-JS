const ProductModel = require('../models/ProductModel');
const Product = ProductModel.product;

// /admin/admin-product => GET
const getAddProduct = (req, res, next) => {
    res.render('admin/add-product', {
        pageTitle: 'Admin',
        path: '/admin/add-product'
    });
};

// /admin/admin-product => POST
const postAddProduct = (req, res, next) => {
    const product = new Product(req.body.title, req.body.image, req.body.price);
    const arr = [];
    arr.push(product);
    product.save();
    res.redirect('/');
};

const getProducts = (req, res, next) => {
    Product.fetchAll(productsList => {
        res.render('admin/products', {
            pageTitle: 'Admin Products',
            productsList: productsList,
            path: 'admin/products'
        });
    });
};

module.exports = {
    getAddProduct: getAddProduct,
    postAddProduct: postAddProduct,
    getProducts: getProducts
}