const express = require('express');
const routes = express.Router();
const AuthController = require('./../controllers/AuthController');
const validate = require('./../util/validate');

routes.get('/signin', AuthController.getSignin);

routes.post('/signin', validate.signin(), AuthController.postSignin);

routes.get('/reset-password', AuthController.getResetPassword);

routes.post('/reset-password', AuthController.postResetPassword);

routes.get('/reset-password/:token', AuthController.getUpdatePassword);

routes.post('/update-password', AuthController.postUpdatePassword);

routes.get('/signup', AuthController.getSignup);

routes.post('/signup', validate.signup(), AuthController.postSignup);

routes.post('/signout', AuthController.postSignout);

module.exports = routes;