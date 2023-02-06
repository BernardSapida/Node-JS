const Sequelize = require('sequelize');
const sequelize = new Sequelize('shop', 'root', '@Database123', { dialect: 'mysql', host: 'localhost' });

module.exports = {
    sequelize: sequelize
}