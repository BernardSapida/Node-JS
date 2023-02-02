const express = require('express');
const routes = express.Router();
const ProductController = require('./../controllers/ProductsController');

routes.get('/products', ProductController.getProduct);

module.exports = routes;