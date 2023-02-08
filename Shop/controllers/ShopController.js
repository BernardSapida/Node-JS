const ProductModel = require('../models/ProductModel');
const Product = ProductModel.Product;

const getIndex = async (req, res, next) => {
    const productsList = await Product.find();

    res.render('shop/index', {
        pageTitle: 'Shop',
        productsList: productsList,
        path: '/'
    });
};

const getProducts = async (req, res, next) => {
    const productsList = await Product.find();

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
    const products = await req.user.populate('cart.items.product');
    const cartProducts = products.cart.items;

    res.render('shop/cart', {
        pageTitle: 'My Cart',
        cartProducts: cartProducts,
        path: '/cart' 
    });
}

const postCart = async (req, res, next) => {
    const id = req.body.id;
    const product = await Product.findById(id);
    await req.user.addToCart(product);

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

    res.render('shop/orders', {
        pageTitle: 'My Orders',
        orders: orders,
        path: '/orders'
    });
}

module.exports = {
    getIndex,
    getProducts,
    getProduct,
    getCart,
    postCart,
    postCartDeleteItem,
    postOrder,
    getOrders,
    getCheckout
}