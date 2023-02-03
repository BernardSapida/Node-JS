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
    const title = req.body.title;
    const description = req.body.description;
    const image = req.body.image;
    const price = req.body.price;
    const product = new Product(title, description, image, price);
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