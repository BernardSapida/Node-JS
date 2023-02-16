const express = require('express');
const routes = express.Router();
const ShopController = require('./../controllers/ShopController');
const isAuth = require('./../middleware/is-auth');

routes.get('/', ShopController.getIndex);

routes.get('/products', ShopController.getProducts);

routes.get('/products/:id', ShopController.getProduct);

routes.get('/products/delete', isAuth, ShopController.getProducts);

routes.get('/cart', isAuth, ShopController.getCart);

routes.post('/cart', isAuth, ShopController.postCart);

routes.delete('/cart-delete-item', isAuth, ShopController.postCartDeleteItem);

routes.post('/create-order', isAuth, ShopController.postOrder);

routes.get('/orders', isAuth, ShopController.getOrders);

// routes.get('/checkout', ShopController.getCheckout);

module.exports = routes;