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
            path: '/admin/edit-product',
            product: product,
            isEditing: true
        });
    } else {
        res.render('admin/edit-product', {
            pageTitle: 'Add Product',
            path: '/admin/add-product',
            product: {},
            isEditing: false
        });
    }
};

// Edit product => Post
const postEditProduct = (req, res, next) => {
    const id = req.body.id;
    const title = req.body.title;
    const price = Number(req.body.price);
    const image = req.body.image;
    const description = req.body.description;
    const product = new Product(title, price, image, description, id);

    product.save();

    res.redirect('/admin/products');
};

// /admin/add-product => POST
const postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const description = req.body.description;
    const image = req.body.image;
    const price = Number(req.body.price);
    const product = new Product(title, price, image, description, null, req.user);

    product.save();

    res.redirect('/admin/products');
};

const getProducts = async (req, res, next) => {
    const productsList = await Product.fetchAll();

    res.render('admin/products', {
        pageTitle: 'Admin Products',
        path: '/admin/products',
        productsList: productsList
    });
};

const postDeleteProduct = (req, res, next) => {
    const id = req.body.id;
    Product.deleteById(id);
    res.redirect('/admin/products');
}

module.exports = {
    getEditProduct: getEditProduct,
    postEditProduct: postEditProduct,
    postAddProduct: postAddProduct,
    getProducts: getProducts,
    postDeleteProduct: postDeleteProduct
}