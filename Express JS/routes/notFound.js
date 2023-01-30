// 3rd Party
const express = require('express');

// Global
const path = require('path');

// Root Directory
const rootDir = require('./../util/path');

// Router
const router = express.Router();

router.use((req, res, next) => {
    res.sendFile(path.join(rootDir, '/views/notFound.html'));
});

module.exports = router;