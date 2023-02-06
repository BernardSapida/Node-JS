const Sequelize = require('sequelize');
const sequelize = new Sequelize('shop', 'root', null, { dialect: 'mysql', host: 'localhost' });

module.exports = {
    sequelize: sequelize
}