const Sequelize = require('sequelize');
const database = require('./../util/database');
const sequelize = database.sequelize;

const Order = sequelize.define('order', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    }
});

module.exports = {
    Order: Order
}