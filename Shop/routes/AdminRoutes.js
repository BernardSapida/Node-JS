const express = require('express');
const routes = express.Router();
const AdminController = require('../controllers/AdminController');
const isAuth = require('./../middleware/is-auth');
const validate = require('./../util/validate');

// All products => GET
routes.get('/products', isAuth, AdminController.getProducts);

// Edit Product => GET
routes.get('/edit-product', isAuth, AdminController.getEditProduct);

// Add Product => POST
routes.post('/add-product', isAuth, validate.products(), AdminController.postAddProduct);

// Edit Product => GET
routes.get('/edit-product/:id', isAuth, AdminController.getEditProduct);

// Edit Product => POST
routes.post('/edit-product', isAuth, validate.products(), AdminController.postEditProduct);

// Delete product => Post
routes.post('/delete-product', isAuth, AdminController.postDeleteProduct);

module.exports = routes;