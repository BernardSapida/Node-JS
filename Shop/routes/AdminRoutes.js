const express = require('express');
const routes = express.Router();
const AdminController = require('../controllers/AdminController');
const isAuth = require('./../middleware/is-auth');

// All products => GET
routes.get('/products', isAuth, AdminController.getProducts);

// Edit Product => GET
routes.get('/edit-product', isAuth, AdminController.getEditProduct);

// Add Product => POST
routes.post('/add-product', isAuth, AdminController.postAddProduct);

// Edit Product => GET
routes.get('/edit-product/:id', isAuth, AdminController.getEditProduct);

// Edit Product => POST
routes.post('/edit-product', isAuth, AdminController.postEditProduct);

// Delete product => Post
routes.post('/delete-product', isAuth, AdminController.postDeleteProduct);

module.exports = routes;