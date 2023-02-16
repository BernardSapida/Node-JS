const Product = require('../models/ProductModel');
const { validationResult } = require('express-validator');

// Edit product => GET
const getEditProduct = async (req, res, next) => {
    const editMode = req.query.edit;
    const id = req.params.id;

    if(editMode === 'true') {
        const product = await Product.findById(id);

        if(!product) return res.redirect('/');

        res.render('admin/edit-product', {
            pageTitle: 'Edit Product',
            product: product,
            isEditing: true,
            error: req.flash('error'),
            path: '/admin/edit-product'
        });
    } else {
        res.render('admin/edit-product', {
            pageTitle: 'Add Product',
            product: {},
            isEditing: false,
            error: req.flash('error'),
            path: '/admin/add-product',
        });
    }
};

// Edit product => Post
const postEditProduct = async (req, res, next) => {
    const { id, title, price, imageURL, description } = req.body;
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        req.flash('error', errors.array()[0].msg);

        return res.status(422).render('admin/edit-product', {
            pageTitle: 'Add Product',
            product: {
                title: title,
                imageURL: imageURL,
                price: price,
                description: description,
                _id: id
            },
            isEditing: true,
            error: req.flash('error'),
            path: '/admin/add-product'
        });
    }

    const product = await Product.findById(id);

    if(product.userId.toString() !== req.user._id.toString()) {
        return res.redirect('/');
    }

    product.title = title;
    product.price = price;
    product.imageURL = imageURL;
    product.description = description;
    product.save();

    res.redirect('/admin/products');
};

// /admin/add-product => POST
const postAddProduct = (req, res, next) => {
    const { title, imageURL, price, description } = req.body;
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        req.flash('error', errors.array()[0].msg);

        return res.status(422).render('admin/edit-product', {
            pageTitle: 'Add Product',
            product: {
                title: title,
                imageURL: imageURL,
                price: price,
                description: description
            },
            isEditing: false,
            error: req.flash('error'),
            path: '/admin/add-product'
        });
    }

    const product = new Product({
        title: title,
        price: price, 
        imageURL: imageURL, 
        description: description,
        userId: req.user,
    });

    product.save();

    res.redirect('/admin/products');
};

// /admin/products => GET
const getProducts = async (req, res, next) => {
    const productsList = await Product.find({ userId: req.user._id });

    res.render('admin/products', {
        pageTitle: 'Admin Products',
        productsList: productsList,
        path: '/admin/products'
    });
};

// /admin/products => POST
const postDeleteProduct = async (req, res, next) => {
    const id = req.body.id;
    await Product.deleteOne({ _id: id, userId: req.user._id });
    res.redirect('/admin/products');
}

module.exports = {
    getEditProduct,
    postEditProduct,
    postAddProduct,
    getProducts,
    postDeleteProduct
}