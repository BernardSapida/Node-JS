const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const path = require("path");

const homeRoute = require('./router/home');
const users = require('./router/users');

app.use(express.static(path.join(__dirname, 'node_modules')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/user', users);
app.use(homeRoute);

app.listen(3000);