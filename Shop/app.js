const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const mongoose = require('mongoose');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const Store = require('connect-mongodb-session')(session);
const { doubleCsrf } = require('csrf-csrf');
const flash = require('connect-flash');
const { body, check } = require('express-validator');
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

const fileStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images')
    },
    filename: (req, file, callback) => {
        callback(null, `${file.fieldname}${Date.now()}.png`);
    }
});

const fileFilter = (req, file, callback) => {
    if(
        file.mimetype == 'image/png' ||
        file.mimetype == 'image/jpg' ||
        file.mimetype == 'image/jpeg'
    ) callback(null, true);
    else callback(null, false);
}

// Set View Engine
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('image'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));
app.use(express.static(path.join(__dirname, 'images')));
app.use(session({ secret: 'secret', resave: false, saveUninitialized: false, store: store }));
app.use(cookieParser('secret'));
// app.use(doubleCsrfProtection);
app.use(flash());

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     next();
// });

app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isAuthenticated;
    res.locals.csrfToken = generateToken(res, req);
    next();
});

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

mongoose.set('strictQuery', true);
mongoose.connect(MONGO_DB_URI).then(() => app.listen(3000));