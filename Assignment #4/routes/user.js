const express = require('express');
const routes = express.Router();

const usersList = [];

routes.get('/add-user', (req, res, next) => {
    res.render('users.ejs', {
        'path' : '/add-user',
        'pageTitle': 'Add new user'
    });
});

routes.post('/add-user', (req, res, next) => {
    usersList.push(req.body.username);
    res.redirect('/');
});

module.exports = {
    routes: routes,
    usersList: usersList
};