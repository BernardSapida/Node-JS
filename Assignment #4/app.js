const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'node_modules')));

// Routes
const homeRoute = require('./routes/index');
const userRoute = require('./routes/user');

app.use(homeRoute);
app.use('/user', userRoute.routes);

app.listen(3000);