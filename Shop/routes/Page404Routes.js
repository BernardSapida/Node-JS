const express = require('express');
const routes = express.Router();
const Page404controller = require('./../controllers/Page404Controller');

routes.get(new RegExp(/.+/, "i"), Page404controller);

module.exports = routes;