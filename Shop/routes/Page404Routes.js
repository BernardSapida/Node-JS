const express = require('express');
const router = express.Router();
const Page404controller = require('./../controllers/Page404Controller');

router.use(Page404controller.page404);

module.exports = router;