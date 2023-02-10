// 3rd Party
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const Store = require('connect-mongodb-session')(session);
const { doubleCsrf } = require('csrf-csrf');

// Initialize
const MONGO_DB_URI = 'mongodb+srv://ZShop:ZShop123@zshop.k1sczh5.mongodb.net/shop';
const app = express();
const store = new Store({
    uri: MONGO_DB_URI,
    collection: 'sessions'
});

// Configuration
// const { generateToken } = doubleCsrf();

// Models
const UserModel = require('./models/UserModel');

// Objects / Classes
const User = UserModel.User;

// Global variables
const path = require('path');

// Set View Engine
app.set('view engine', 'ejs');
app.set('views', 'views');

// Routes
const shopRoutes = require('./routes/ShopRoutes');
const adminRoutes = require('./routes/AdminRoutes');
const authRoutes = require('./routes/AuthRoutes');
const notFoundRoutes = require('./routes/Page404Routes');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));
app.use(session({ secret: 'shop', resave: false, saveUninitialized: false, store: store }));

// console.log(generateToken())

app.use(async (req, res, next) => {
    if(!req.session.user) return next();
    const user = await User.findById(req.session.user._id);
    req.user = user;
    next();
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);
app.use(notFoundRoutes);

(async function() {
    await mongoose.connect(MONGO_DB_URI);
    app.listen(3000);
})();

