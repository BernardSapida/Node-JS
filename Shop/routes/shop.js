const express = require('express');
const router = express.Router();
const products_controller = require('./../controllers/products');

router.get('/', products_controller.getProduct);

module.exports = router;