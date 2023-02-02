const express = require('express');
const routes = express.Router();
const ProductsController = require('./../controllers/ProductsController');

// /admin/admin-product => GET
routes.get('/add-product', ProductsController.getAddProduct);

// /admin/admin-product => POST
routes.post('/add-product', ProductsController.postAddProduct);

module.exports = {
    routes: routes
}