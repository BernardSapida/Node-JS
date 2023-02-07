const ProductModel = require('../models/ProductModel');
const UserModel = require('../models/UserModel');
const Product = ProductModel.Product;
const User = UserModel.User;

const getIndex = async (req, res, next) => {
    const productsList = await Product.fetchAll();

    res.render('shop/index', {
        pageTitle: 'Shop',
        productsList: productsList,
        path: '/'
    });
};

const getProducts = async (req, res, next) => {
    const productsList = await Product.fetchAll();

    res.render('shop/product-list', {
        pageTitle: 'All Products',
        productsList: productsList,
        path: '/products'
    });
};

const getProduct = async (req, res, next) => {
    const id = req.params.id;
    const product = await Product.findById(id);

    res.render('shop/product-detail', {
        pageTitle: 'View Product',
        product: product,
        path: '/products'
    });
}

const getCart = async (req, res, next) => {
    const cartProducts = await req.user.getCart();
    
    res.render('shop/cart', {
        pageTitle: 'My Cart',
        cartProducts: cartProducts,
        path: '/cart' 
    });
}

const postCart = async (req, res, next) => {
    const id = req.body.id;
    const product = await Product.findById(id);
    const result = await req.user.addToCart(product);

    res.redirect('/cart');
}

const postCartDeleteItem = async (req, res, next) => {
    const id = req.body.id;
    await req.user.deleteItemFromCart(id);
    res.redirect('/cart');
};

const getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        pageTitle: 'Checkout',
        path: '/checkout'
    });
}

const postOrder = async (req, res, next) => {
    await req.user.addOrder();
    res.redirect('/orders');
}

const getOrders = async (req, res, next) => {
    const ordersRecord = await req.user.getOrders();
    const orders = ordersRecord[0];

    console.log(orders);

    res.render('shop/orders', {
        pageTitle: 'My Orders',
        orders: orders,
        path: '/orders'
    });
}

module.exports = {
    getIndex: getIndex,
    getProducts: getProducts,
    getProduct: getProduct,
    getCart: getCart,
    postCart: postCart,
    postCartDeleteItem: postCartDeleteItem,
    postOrder: postOrder,
    getOrders: getOrders,
    getCheckout: getCheckout
}