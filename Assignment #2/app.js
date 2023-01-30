const express = require('express');
const app = express();

app.use('/users', (req, res, next) => {
    console.log('<h1>You are in /users middleware</h1>');
    res.send("<h1>You are in /users</h1>")
});

app.use('/', (req, res, next) => {
    console.log('<h1>You are in / middleware</h1>');
    res.send("<h1>You are in /</h1>")
});

app.listen(3000);