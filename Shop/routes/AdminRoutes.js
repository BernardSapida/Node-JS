const express = require('express');
const routes = express.Router();
const AdminController = require('../controllers/AdminController');

// /admin/admin-product => GET
routes.get('/add-product', AdminController.getAddProduct);

// /admin/products => GET
routes.get('/products', AdminController.getProducts);

// /admin/admin-product => POST
routes.post('/add-product', AdminController.postAddProduct);

module.exports = {
    routes: routes
}