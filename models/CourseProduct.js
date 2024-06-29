const {Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../util/database');

const CourseProduct = sequelize.define('CourseProduct', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    duration: {
        type: Sequelize.STRING,
        allowNull: false
    },
    image: {
        type: Sequelize.STRING,
        allowNull: true 
    }
});

// Example of additional methods for CourseProduct
CourseProduct.fetchProducts = async () => {
    try {
        const products = await CourseProduct.findAll();
        return products;
    } catch (err) {
        console.error('Error fetching course products:', err);
        return [];
    }
};

CourseProduct.findProductById = async (id) => {
    try {
        const product = await CourseProduct.findByPk(id);
        return product;
    } catch (err) {
        console.error(`Error finding course product with ID ${id}:`, err);
        return null;
    }
};

module.exports = CourseProduct;
