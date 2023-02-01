const express = require('express');
const router = express.Router();
const adminData = require('./admin');

router.get('/', (req, res, next) => {
    res.render('shop', {
        pageTitle: 'Shop',
        productList: adminData.products,
        path: '/'
    });
    console.log(adminData.products);
});

module.exports = router;