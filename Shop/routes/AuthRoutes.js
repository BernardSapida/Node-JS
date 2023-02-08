const express = require('express');
const routes = express.Router();
const AuthController = require('./../controllers/AuthController');

routes.get('/login', AuthController.getLogin);

routes.post('/login', AuthController.postLogin);

module.exports = routes;