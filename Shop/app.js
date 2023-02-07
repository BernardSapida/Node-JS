// 3rd Party
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Database configuration with sequelize
const mongoConnect = require('./util/database');

// Models
// const ProductModel = require('./models/ProductModel');
// const UserModel = require('./models/UserModel');
// const CartModel = require('./models/CartModel');
// const CartItemModel = require('./models/CartItemModel');
// const OrderModel = require('./models/OrderModel');
// const OrderItemModel = require('./models/OrderItemModel');

// const Product = ProductModel.Product;
// const User = UserModel.User;
// const Cart = CartModel.Cart;
// const CartItem = CartItemModel.CartItem;
// const Order = OrderModel.Order;
// const OrderItem = OrderItemModel.OrderItem;


// Global variables
// const path = require('path');

// Set View Engine
// app.set('view engine', 'ejs');
// app.set('views', 'views');

// Routes
// const shopRoutes = require('./routes/ShopRoutes');
const adminRoutes = require('./routes/AdminRoutes');
// const notFoundRoutes = require('./routes/Page404Routes');

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(path.join(__dirname, 'node_modules')));

// app.use(async (req, res, next) => {
//     const user = await User.findByPk(1);
//     req.user = user;
//     next();
// });
app.use('/admin', adminRoutes.routes);
// app.use(shopRoutes);
// app.use(notFoundRoutes);

// Database Relationships

// One to many relationship
// Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
// User.hasMany(Product);
// User.hasOne(Cart);
// Cart.belongsTo(User);
// Cart.belongsToMany(Product, { through: CartItem });
// Product.belongsToMany(Cart, { through: CartItem });
// Order.belongsTo(User);
// User.hasMany(Order);
// Order.belongsToMany(Product, { through: OrderItem });

mongoConnect((client) => {
    console.log(client);
    app.listen(3000);
});

