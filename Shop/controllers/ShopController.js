const Product = require('../models/ProductModel');
const Order = require('../models/OrderModel');
const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');

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
        path: '/orders'
    });
}

const getInvoice = async (req, res, next) => {
    const orderId = req.params.orderId;
    const invoiceName = `invoice-${orderId}.pdf`;
    const invoicePath = path.join(`data/invoices/${invoiceName}`);
    const order = await Order.findById(orderId);
    const pdfDocument = new PDFDocument();
    let total = 0;

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename=${invoiceName}`);
    pdfDocument.pipe(fs.createWriteStream(invoicePath));
    pdfDocument.pipe(res);

    pdfDocument.fontSize(26).text('Invoice', {
        underline: true,
    });

    pdfDocument.fontSize(18).text('-------------------------------------------');

    for(item of order.products) {
        pdfDocument.text(`Title: ${item.product.title}`);
        pdfDocument.text(`Quantity: ${item.quantity}pcs`);
        pdfDocument.text(`Price: $${item.product.price}`);
        pdfDocument.text('-------------------------------------------');

        total += (item.product.price * item.quantity);
    }
    pdfDocument.text(`Total Amount: $${total}`)

    pdfDocument.end();
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
    getCheckout,
    getInvoice
}