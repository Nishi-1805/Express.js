const {Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../util/database');

// Define the CourseProduct model
const CourseProduct = sequelize.define('CourseProduct', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    duration: {
        type: DataTypes.STRING, // Adjust the data type as per your needs
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true // Assuming image is optional
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
