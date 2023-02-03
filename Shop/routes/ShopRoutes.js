const express = require('express');
const routes = express.Router();
const ShopController = require('../controllers/ShopController');
const ProductModel = require('../models/ProductModel');
const Product = ProductModel.product;

routes.get('/', ShopController.getIndex);
routes.get('/products', ShopController.getProducts);
routes.get('/cart', ShopController.getCart);
routes.get('/checkout', ShopController.getCheckout);

module.exports = routes;