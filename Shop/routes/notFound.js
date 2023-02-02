const express = require('express');
const router = express.Router();
const page404_controller = require('./../controllers/page404');

router.use(page404_controller.page404);

module.exports = router;