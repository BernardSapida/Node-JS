const express = require('express');
const routes = express.Router();
const AdminController = require('../controllers/AdminController');

// All products => GET
routes.get('/products', AdminController.getProducts);

// Edit Product => GET
routes.get('/edit-product', AdminController.getEditProduct);

// Add Product => POST
routes.post('/add-product', AdminController.postAddProduct);

// Edit Product => GET
routes.get('/edit-product/:id', AdminController.getEditProduct);

// Edit Product => POST
routes.post('/edit-product', AdminController.postEditProduct);

// Delete product => Post
routes.post('/delete-product', AdminController.postDeleteProduct);

module.exports = {
    routes: routes
}