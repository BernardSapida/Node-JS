const express = require('express');
const routes = express.Router();
const AuthController = require('./../controllers/AuthController');

routes.get('/signin', AuthController.getSignin);

routes.post('/signin', AuthController.postSignin);

routes.get('/signup', AuthController.getSignup);

routes.post('/signup', AuthController.postSignup);

routes.post('/signout', AuthController.postSignout);

module.exports = routes;