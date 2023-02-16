const express = require('express');
const routes = express.Router();
const Page404controller = require('./../controllers/Page404Controller');

routes.all('*', Page404controller);

module.exports = routes;