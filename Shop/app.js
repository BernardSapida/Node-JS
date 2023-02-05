// 3rd Party
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require('./util/database');

// Global variables
const path = require('path');

// Set View Engine
app.set('view engine', 'ejs');
app.set('views', 'views');

// Routes
const shopRoutes = require('./routes/ShopRoutes');
const adminRoutes = require('./routes/AdminRoutes');
const notFoundRoutes = require('./routes/Page404Routes');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));

app.use('/admin', adminRoutes.routes);
app.use(shopRoutes);
app.use(notFoundRoutes);

// Database
db.execute('SELECT * FROM products')
    .then(result => {
        console.log(result);
    })
    .catch(err => {
        console.log(err);
    });

app.listen(3000);