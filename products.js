const path = require('path');
const Product = require('../models/product');
const Cart = require('../models/cart');

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

exports.getAllProducts = (req, res, next) => {
    Product.fetchProducts(products => {
        res.sendFile(path.join(__dirname, '../views', 'products.html'));
    });
};

exports.getProductDetail = (req, res, next) => {
    const productId = req.params.productId;
    Product.findProductById(productId, product => {
        if (product) {
            res.json(product);  // For now, just send the product details in response
        } else {
            res.status(404).send('Product not found');
        }
    });
};

exports.postAddToCart = (req, res, next) => {
    const productId = req.body.productId; // Assuming productId is sent via form or AJAX
    Product.findById(productId, product => {
        if (!product) {
            return res.status(404).sendFile(path.join(__dirname, '../views', '404.html'));
        }
        Cart.addProduct(productId, product.price, () => {
            res.redirect('/cart');
        });
    });
};

// Remove product from cart
exports.postRemoveFromCart = (req, res, next) => {
    const productId = req.body.productId; // Assuming productId is sent via form or AJAX
    Product.findById(productId, product => {
        if (!product) {
            return res.status(404).sendFile(path.join(__dirname, '../views', '404.html'));
        }
        Cart.deleteProduct(productId, product.price, () => {
            res.redirect('/cart');
        });
    });
};

// Display cart
exports.getCart = (req, res, next) => {
    Cart.getCart(cart => {
        if (!cart) {
            cart = { products: [], totalPrice: 0 };
        }
        res.sendFile(path.join(__dirname, '..', 'views', 'cart.html'));
    });
};

// Handle adding a product (POST)
exports.postAddProduct = (req, res, next) => {
    const { name, email, phone, date, time } = req.body;
    const product = { name, email, phone, date, time };
Product.saveProduct(product, (err) => {
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

// Fetch all products and render courses page
exports.getCourses = (req, res, next) => {
    Product.fetchProducts((products) => {
        res.sendFile(path.join(__dirname, '../views', 'courses.html'));
    });
};

// Get product details by ID
exports.getProductDetail = (req, res, next) => {
    const productId = req.params.productId;
    Product.findProductById(productId, (product) => {
        if (product) {
            res.json(product);  // For now, just send the product details in response
        } else {
            res.status(404).send('Product not found');
        }
    });
};
