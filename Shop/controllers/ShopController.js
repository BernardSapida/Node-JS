const ProductModel = require('../models/ProductModel');
const Product = ProductModel.product;
const CartModel = require('../models/CartModel');
const Cart = CartModel.cart;

const getIndex = (req, res, next) => {
    Product.fetchAll(productsList => {
        res.render('shop/index', {
            pageTitle: 'Shop',
            productsList: productsList,
            path: '/shop'
        });
    });
};

const getProducts = (req, res, next) => {
    Product.fetchAll(productsList => {
        res.render('shop/product-list', {
            pageTitle: 'All Products',
            productsList: productsList,
            path: '/products'
        });
    });
};

const getProduct = (req, res, next) => {
    const id = req.params.id;

    Product.findById(id, product => {
        res.render('shop/product-detail', {
            pageTitle: 'View Product',
            product: product,
            path: '/products'
        });
    });
}

const getCart = (req, res, next) => {
    res.render('shop/cart', {
        pageTitle: 'My Cart',
        path: '/cart'
    });
}

const postCart = (req, res, next) => {
    const id = req.body.id;
    Product.findById(id, product => {
        Cart.addProduct(id, product.price);
    });
    res.redirect('/');
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
    getIndex: getIndex,
    getProducts: getProducts,
    getProduct: getProduct,
    getCart: getCart,
    postCart: postCart,
    getOrders: getOrders,
    getCheckout: getCheckout
}