// 3rd Party
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');

// Database configuration with sequelize

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
const notFoundRoutes = require('./routes/Page404Routes');

app.use(async (req, res, next) => {
    const user = await User.findById('63e2fe5f2b753602e86f618a');
    req.user = user;

    next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));

app.use('/admin', adminRoutes.routes);
app.use(shopRoutes);
app.use(notFoundRoutes);

(async function() {
    await mongoose.connect('mongodb+srv://ZShop:ZShop123@zshop.k1sczh5.mongodb.net/shop?retryWrites=true&w=majority');

    if(!User.findOne()) {
        const user = new User({
            name: 'Bernard Sapida',
            email: 'bernardsapida1706@gmail.com',
            cart: []
        });

        user.save();
    }
    
    app.listen(3000);
})();

