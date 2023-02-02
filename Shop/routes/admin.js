const express = require('express');
const router = express.Router();
const products_controller = require('./../controllers/products');

// /admin/admin-product => GET
router.get('/add-product', products_controller.getAddProduct);

// /admin/admin-product => POST
router.post('/add-product', products_controller.postAddProduct);

module.exports = {
    routes: router
}