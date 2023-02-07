// 3rd Party
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Database configuration with sequelize
const database = require('./util/database');

// Models
const UserModel = require('./models/UserModel');


// Global variables
const path = require('path');

// Set View Engine
app.set('view engine', 'ejs');
app.set('views', 'views');

// Routes
const shopRoutes = require('./routes/ShopRoutes');
const adminRoutes = require('./routes/AdminRoutes');
const notFoundRoutes = require('./routes/Page404Routes');

app.use(async (req, res, next) => {
    const User = UserModel.User;
    const user = await User.findById('63e1e055a8f741758e74ac3f');

    if(!user) {
        const user = new User("Bernard Sapida", "bernardsapida1706@gmail.com");
        user.save();
    } else {
        req.user = new User(user.name, user.email, user.cart || [], '63e1e055a8f741758e74ac3f');
    }

    next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));

app.use('/admin', adminRoutes.routes);
app.use(shopRoutes);
app.use(notFoundRoutes);

database.MongoConnect(() => app.listen(3000));

