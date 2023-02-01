const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
    res.render('notFound', {
        pageTitle: 'Not Found',
        path: '/notFound'
    });
});

module.exports = router;