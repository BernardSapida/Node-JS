const express = require('express');
const routes = express.Router();
const AuthController = require('./../controllers/AuthController');

routes.get('/login', AuthController.getSignin);

routes.post('/login', AuthController.postSignin);

module.exports = routes;