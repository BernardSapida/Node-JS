const ProductModel = require('../models/ProductModel');
const Product = ProductModel.Product;

const CartModel = require('../models/CartModel');
const Cart = CartModel.cart;

const getIndex = async (req, res, next) => {
    const productsList = Product.findAll();

    res.render('shop/index', {
        pageTitle: 'Shop',
        productsList: productsList,
        path: '/shop'
    });
};

const getProducts = async (req, res, next) => {
    const productsList = await Product.findAll();

    res.render('shop/product-list', {
        pageTitle: 'All Products',
        productsList: productsList,
        path: '/products'
    });
};

const getProduct = async (req, res, next) => {
    const id = req.params.id;
    const product = await Product.findByPk(id);

    res.render('shop/product-detail', {
        pageTitle: 'View Product',
        product: product,
        path: '/products'
    });
}

const getCart = (req, res, next) => {
    Cart.getCart(async cart => {
        const products = await Product.findAll()
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
}

const postCart = async (req, res, next) => {
    const id = req.body.id;
    const product = await Product.findByPk(id)
    Cart.addProduct(id, product.price);
    res.redirect('/');
}

const postCartDeleteItem = async (req, res, next) => {
    const id = req.body.id;
    const product = await Product.findByPk(id)

    Cart.deleteProduct(id, product.price);
    res.redirect('/cart');
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