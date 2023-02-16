const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const Store = require('connect-mongodb-session')(session);
const { doubleCsrf } = require('csrf-csrf');
const flash = require('connect-flash');
require('dotenv').config();

const shopRoutes = require('./routes/ShopRoutes');
const adminRoutes = require('./routes/AdminRoutes');
const authRoutes = require('./routes/AuthRoutes');
const notFoundRoutes = require('./routes/Page404Routes');

const MONGO_DB_URI = process.env.MONGODB_URI;
const app = express();
const store = new Store({
    uri: MONGO_DB_URI,
    collection: 'sessions'
});

// csrf configuration
const { generateToken, doubleCsrfProtection } = doubleCsrf({
    getSecret: () => "secret",
    cookieName: "x-csrf-token",
    getTokenFromRequest: (req) => req.body["csrfToken"]
});

// Models
const User = require('./models/UserModel');

// Set View Engine
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));
app.use(session({ secret: 'secret', resave: false, saveUninitialized: false, store: store }));
app.use(cookieParser('secret'));
app.use(doubleCsrfProtection);
app.use(flash());

app.use(async (req, res, next) => {
    if(!req.session.user) return next();
    const user = await User.findById(req.session.user._id);
    req.user = user;
    next();
});

app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isAuthenticated;
    res.locals.csrfToken = generateToken(res, req);
    console.log('Token!')
    next();
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);
app.use(notFoundRoutes);

mongoose.set('strictQuery', true);
mongoose.connect(MONGO_DB_URI).then(() => app.listen(3000));