const Sequelize = require('sequelize');
const database = require('./../util/database');
const sequelize = database.sequelize;

const OrderItem = sequelize.define('orderitem', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

module.exports = {
    OrderItem: OrderItem
}