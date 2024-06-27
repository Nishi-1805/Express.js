const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-connect', 'root', 'Rajran@21210703', {dialect: 'mysql', host: 'localhost' });

module.exports = sequelize;