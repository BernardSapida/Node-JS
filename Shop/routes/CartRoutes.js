const express = require('express');
const CartController = require('./../controllers/CartController');
const routes = express.Router();

routes.get('/cart', CartController.getCart);

module.exports = routes;