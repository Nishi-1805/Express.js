const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../util/database');

const Cart = sequelize.define('Cart', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'User', 
            key: 'id'
        },
        onDelete: 'CASCADE'
    }
});

module.exports = Cart;

