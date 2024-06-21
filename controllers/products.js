const path = require('path');
const productModel = require('../models/product');

exports.getHome = (req, res, next) => {
    res.sendFile(path.join(__dirname, '../views', 'shop.html'));
};

exports.redirectHome = (req, res, next) => {
    res.redirect('/');
};

exports.getContactUs = (req, res, next) => {
    res.sendFile(path.join(__dirname, '../views', 'contact-us.html'));
};

exports.postAddProduct = (req, res, next) => {
    const { name, email, phone, date, time } = req.body;
    const product = `Name: ${name}, 
    Email: ${email}, 
    Phone: ${phone}, 
    Date: ${date}, 
    Time: ${time}`;

    productModel.saveProduct(product)
        .then(() => {
            res.redirect('/success'); // Redirect to success page
        })
        .catch(err => {
            console.error('Error saving product:', err);
            res.status(500).send('Failed to save product');
        });
};
exports.getAddProduct = (req, res, next) => {
    res.sendFile(path.join(__dirname, '../views', 'add-product.html'));
};
