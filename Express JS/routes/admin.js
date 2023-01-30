// 3rd Party
const express = require('express');

// Global
const path = require('path');

// Root Directory
const rootDir = require('./../util/path');

// Router
const router = express.Router();

// /admin/admin-product => GET
router.get('/add-product', (req, res, next) => {
    res.sendFile(path.join(rootDir, '/views/add-product.html'));
});

// /admin/admin-product => POST
router.post('/add-product', (req, res, next) => {
    console.log(req.body);
    res.redirect('/');
});

module.exports = router;