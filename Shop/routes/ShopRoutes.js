const express = require('express');
const routes = express.Router();
const ShopController = require('../controllers/ShopController');
const ProductModel = require('../models/ProductModel');
const Product = ProductModel.product;

routes.get('/', ShopController.getIndex);

routes.get('/products', ShopController.getProducts);

routes.get('/products/delete', ShopController.getProducts);

routes.get('/products/:id', ShopController.getProduct);

routes.get('/cart', ShopController.getCart);

routes.post('/cart', ShopController.postCart);

routes.post('/cart-delete-item', ShopController.postCartDeleteItem);

routes.get('/orders', ShopController.getOrders);

routes.get('/checkout', ShopController.getCheckout);

module.exports = routes;