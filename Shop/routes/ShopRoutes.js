const express = require('express');
const routes = express.Router();
const ProductsController = require('./../controllers/ProductsController');

routes.get('/', ProductsController.getProduct);

module.exports = routes;