const ProductModel = require('../models/ProductModel');
const OrderModel = require('../models/OrderModel');

const Product = ProductModel.Product;
const Order = OrderModel.Order;

const getIndex = async (req, res, next) => {
    const productsList = await Product.find();

    res.render('shop/index', {
        pageTitle: 'Shop',
        productsList: productsList,
        isAuthenticated: req.session.isAuthenticated,
        path: '/'
    });
};

const getProducts = async (req, res, next) => {
    const productsList = await Product.find();

    res.render('shop/product-list', {
        pageTitle: 'All Products',
        productsList: productsList,
        isAuthenticated: req.session.isAuthenticated,
        path: '/products'
    });
};

const getProduct = async (req, res, next) => {
    const id = req.params.id;
    const product = await Product.findById(id);

    res.render('shop/product-detail', {
        pageTitle: 'View Product',
        product: product,
        isAuthenticated: req.session.isAuthenticated,
        path: '/products'
    });
}

const getCart = async (req, res, next) => {
    const products = await req.user.populate('cart.items.product');
    const cartProducts = products.cart.items;

    res.render('shop/cart', {
        pageTitle: 'My Cart',
        cartProducts: cartProducts,
        isAuthenticated: req.session.isAuthenticated,
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
        isAuthenticated: req.session.isAuthenticated,
        path: '/checkout'
    });
}

const postOrder = async (req, res, next) => {
    const products = await req.user.populate('cart.items.product');
    let cartProducts = products.cart.items;

    cartProducts = cartProducts.map(product => {
        return {
            quantity: product.quantity,
            product: { ...product.product._doc }
        }
    });

    const order = new Order({
        user: {
            email: req.user.email,
            userId: req.user
        },
        products: cartProducts
    });

    order.save();
    req.user.clearCart();
    res.redirect('/orders');
}

const getOrders = async (req, res, next) => {
    const orders = await Order.find({ "user.userId": req.user._id  });

    res.render('shop/orders', {
        pageTitle: 'My Orders',
        orders: orders,
        isAuthenticated: req.session.isAuthenticated,
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