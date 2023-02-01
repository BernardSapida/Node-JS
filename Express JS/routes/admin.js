const express = require('express');
const router = express.Router();
const products = [];

// /admin/admin-product => GET
router.get('/add-product', (req, res, next) => {
    res.render('add-product', {
        pageTitle: 'Admin',
        path: '/add-product'
    });
});

// /admin/admin-product => POST
router.post('/add-product', (req, res, next) => {
    products.push({
        'title': req.body.title,
        'image': req.body.image,
        'price': req.body.price,
    });
    res.redirect('/');
});

module.exports = {
    routes: router,
    products: products
}