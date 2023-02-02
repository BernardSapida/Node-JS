const express = require('express');
const routes = express.Router();

const userRoutes = require('./user');

routes.get('/', (req, res, next) => {
    const usersList = userRoutes.usersList;

    res.render('index.ejs', {
        path: '/',
        pageTitle: 'Home',
        usersList: usersList
    });
});

module.exports = routes;