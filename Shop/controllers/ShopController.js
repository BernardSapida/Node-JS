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
    Cart.getCart(cart => {
        Product.fetchAll(products => {
            const cartProducts = [];
            let cartProduct;

            for(product of products) {
                cartProduct = cart.products[product.id];
                if(cart.products[product.id]) {
                    cartProducts.push({ productData: product, quantity: cartProduct.quantity });
                }
            }

            res.render('shop/cart', {
                pageTitle: 'My Cart',
                cartProducts: cartProducts,
                path: '/cart' 
            });
        });
    });
}

const postCart = (req, res, next) => {
    const id = req.body.id;
    Product.findById(id, product => {
        Cart.addProduct(id, product.price);
    });
    res.redirect('/');
}

const postCartDeleteItem = (req, res, next) => {
    const id = req.body.id;

    Product.findById(id, product => {
        Cart.deleteProduct(id, product.price);
        res.redirect('/cart');
    });
};

const getOrders = (req, res, next) => {
    res.render('shop/orders', {
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
    postCartDeleteItem: postCartDeleteItem,
    getOrders: getOrders,
    getCheckout: getCheckout
}