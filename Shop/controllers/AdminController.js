const Product = require('../models/ProductModel');
const { validationResult } = require('express-validator');
const file = require('./../util/file');

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
    const { id, title, price, description } = req.body;
    const image = req.file;
    const errors = validationResult(req);

    if(!errors.isEmpty() || !image) {
        if(!errors.isEmpty()) req.flash('error', errors.array()[0].msg);
        else req.flash('error', 'Image file is required! (.png, .jpg or .jpeg)');

        return res.status(422).render('admin/edit-product', {
            pageTitle: 'Add Product',
            product: {
                title: title,
                image: image,
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

    const imageUrl = image.filename;

    product.title = title;
    product.price = price;
    product.image = imageUrl;
    product.description = description;
    product.save();

    res.redirect('/admin/products');
};

// /admin/add-product => POST
const postAddProduct = (req, res, next) => {
    const { title, price, description } = req.body;
    const image = req.file;
    let errors = validationResult(req);

    if(!errors.isEmpty() || !image) {
        if(!errors.isEmpty()) req.flash('error', errors.array()[0].msg);
        else req.flash('error', 'Image file is required! (.png, .jpg or .jpeg)');

        return res.status(422).render('admin/edit-product', {
            pageTitle: 'Add Product',
            product: {
                title: title,
                price: price,
                description: description
            },
            isEditing: false,
            error: req.flash('error'),
            path: '/admin/add-product'
        });
    }

    const imageUrl = image.filename;

    const product = new Product({
        title: title,
        price: price, 
        image: imageUrl, 
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
    const product = await Product.findById(id);
    await Product.deleteOne({ _id: id, userId: req.user._id });
    file.deleteFile(product.image);
    res.redirect('/admin/products');
}

module.exports = {
    getEditProduct,
    postEditProduct,
    postAddProduct,
    getProducts,
    postDeleteProduct
}