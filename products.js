const path = require('path');
const productModel = require('../models/product');

// Render the home page
exports.getHome = (req, res, next) => {
    res.sendFile(path.join(__dirname, '../views', 'shop.html'));
};

// Redirect to home page
exports.redirectHome = (req, res, next) => {
    res.redirect('/');
};

// Render the contact us page
exports.getContactUs = (req, res, next) => {
    res.sendFile(path.join(__dirname, '../views', 'contact-us.html'));
};

// Handle adding a product (POST)

exports.postAddProduct = (req, res, next) => {
    const { name, email, phone, date, time } = req.body;
    const product = { name, email, phone, date, time };
productModel.saveProduct(product, (err) => {
    if (err) {
        console.error('Error saving product:', err);
        res.status(500).send('Error saving product');
    } else {
        res.redirect('/success');
    }
});
};

// Render the success page
exports.getSuccess = (req, res, next) => {
    res.sendFile(path.join(__dirname, '../views', 'success.html'));
};

// Serve the 404 error page
exports.get404 = (req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, '..', 'views', '404.html'));
};

// Placeholder for adding a product (GET)
//exports.getAddProduct = (req, res, next) => {
  //  res.send('Add Product Page'); // Replace with actual implementation if necessary
//};

// Fetch all products and render courses page
exports.getCourses = (req, res, next) => {
    productModel.fetchProducts((products) => {
        res.sendFile(path.join(__dirname, '../views', 'courses.html'));
    });
};

// Get product details by ID
exports.getProductDetail = (req, res, next) => {
    const productId = req.params.productId;
    productModel.findProductById(productId, (product) => {
        if (product) {
            res.json(product);  // For now, just send the product details in response
        } else {
            res.status(404).send('Product not found');
        }
    });
};
