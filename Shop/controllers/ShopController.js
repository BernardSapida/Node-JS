const ProductModel = require('../models/ProductModel');
const Product = ProductModel.product;

const getProducts = (req, res, next) => {
    Product.fetchAll(productsList => {
        res.render('shop/product-list', {
            pageTitle: 'All Products',
            productsList: productsList,
            path: '/products'
        });
    });
};

const getIndex = (req, res, next) => {
    Product.fetchAll(productsList => {
        res.render('shop/index', {
            pageTitle: 'Shop',
            productsList: productsList,
            path: '/shop'
        });
    });
};

const getCart = (req, res, next) => {
    res.render('shop/cart', {
        pageTitle: 'My Cart',
        path: '/cart'
    });
}

const getOrders = (req, res, next) => {
    res.render('shop/cart', {
        pageTitle: 'My Orders',
        path: '/orders'
    });
}

const getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        pageTitle: 'Checkout',
        path: '/checkout'
    });
}

module.exports = {
    getProducts: getProducts,
    getIndex: getIndex,
    getCart: getCart,
    getOrders: getOrders,
    getCheckout: getCheckout
}