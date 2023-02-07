const Sequelize = require('sequelize');
const database = require('./../util/database');
const sequelize = database.sequelize;

const Cart = sequelize.define('cart', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    }
});

module.exports = {
    Cart: Cart
}