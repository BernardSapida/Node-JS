const ProductModel = require('../models/ProductModel');
const Product = ProductModel.Product;

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
            isAuthenticated: req.session.isAuthenticated,
            path: '/admin/edit-product'
        });
    } else {
        res.render('admin/edit-product', {
            pageTitle: 'Add Product',
            product: {},
            isEditing: false,
            isAuthenticated: req.session.isAuthenticated,
            path: '/admin/add-product',
        });
    }
};

// Edit product => Post
const postEditProduct = async (req, res, next) => {
    const id = req.body.id;
    const title = req.body.title;
    const price = Number(req.body.price);
    const image = req.body.image;
    const description = req.body.description;
    const product = await Product.findById(id);

    product.title = title;
    product.price = price;
    product.image = image;
    product.description = description;
    product.save();

    res.redirect('/admin/products');
};

// /admin/add-product => POST
const postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const description = req.body.description;
    const imageURL = req.body.image;
    const price = Number(req.body.price);

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
    const productsList = await Product.find();

    res.render('admin/products', {
        pageTitle: 'Admin Products',
        productsList: productsList,
        isAuthenticated: req.session.isAuthenticated,
        path: '/admin/products'
    });
};

// /admin/products => POST
const postDeleteProduct = async (req, res, next) => {
    const id = req.body.id;
    await Product.findByIdAndRemove(id);
    res.redirect('/admin/products');
}

module.exports = {
    getEditProduct,
    postEditProduct,
    postAddProduct,
    getProducts,
    postDeleteProduct
}