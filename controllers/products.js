const path = require('path');
const Product = require('../models/product');
const Cart = require('../models/cart');
const CourseProduct = require('../models/CourseProduct');
const Contact = require('../models/Contact');
const db = require('../util/database');

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

exports.getAddProductPage = (req, res, next) => {
    res.sendFile(path.join(__dirname, '../views', 'add-product.html'));
};

// Fetch and send all course products as JSON
exports.getAllProducts = (req, res, next) => {
    db.execute('SELECT * FROM products')
    .then(([rows, fieldData]) => {
        res.json(rows);
    })
    .catch(err => {
        console.error('Error fetching products:', err);
        res.status(500).json({ message: 'Error fetching products' });
    });
};

exports.getProductsPage = (req, res, next) => {
    res.sendFile(path.join(__dirname, '../views', 'products.html'));
};

exports.postAddToCart = (req, res, next) => {
    const { productId, name, price, image, qty } = req.body;
    CourseProduct.findProductById(productId, product => {
        if (!product) {
            return res.status(404).sendFile(path.join(__dirname, '../views', '404.html'));
        }
        Cart.addProduct(productId, price, name, image, qty, (err) => {
            if (err) {
                return res.status(500).send({ message: 'Error adding product to cart' });
            }
            res.send({ message: 'Product added to cart successfully' });
        });
    });
};

// Handle editing a product in cart (POST)
exports.postEditCartItem = (req, res, next) => {
    const productId = req.body.productId;
    const newQty = req.body.newQty;
    db.execute('UPDATE cart SET quantity = ? WHERE product_id = ?', [newQty, productId])
        .then(() => {
            res.redirect('/cart');
        })
        .catch(err => {
            console.error('Error editing cart item:', err);
            res.status(500).send('Internal Server Error');
    });
};

// Remove product from cart
exports.postRemoveFromCart = (req, res, next) => {
    const { productId } = req.body;

    if (!productId) {
        return res.status(400).json({ message: 'ProductId is required' });
    }

    Cart.deleteProduct(productId, (err) => {
        if (err) {
            console.error('Error removing from cart:', err);
            return res.status(500).send('Internal Server Error');
        }
        res.redirect('/cart'); // Redirect to cart page after successful deletion
    });
};

// Display cart
exports.getCart = (req, res, next) => {
    Cart.getCart(cart => {
        res.json(cart);
    });
};

// Render cart page
exports.getCartPage = (req, res, next) => {
    res.sendFile(path.join(__dirname, '../views', 'cart.html'));
};

// Handle adding a product (POST)
exports.postAddProduct = (req, res, next) => {
    const { name, email, phone, date, time } = req.body;
    
    if (!name || !email || !phone || !date || !time) {
        return res.status(400).send('All fields are required');
    }

    const contact = new Contact(name, email, phone, date, time);
    contact.save((err) => {
        if (err) {
            console.error('Error saving contact:', err);
            res.status(500).send('Error saving contact');
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
    CourseProduct.fetchProducts((products) => {
        res.sendFile(path.join(__dirname, '../views', 'courses.html'));
    });
};

// Get product details by ID
exports.getProductDetail = (req, res, next) => {
    const productId = req.params.productId;
    CourseProduct.findProductById(productId, (product) => {
        if (product) {
            res.json(product);  // For now, just send the product details in response
        } else {
            res.status(404).send('Product not found');
        }
    });
};

exports.AddNewProduct = (req, res, next) => {
    console.log(req.body);
    const { id, title, price, imageUrl, description } = req.body;

    if (!title || !price || !imageUrl || !description) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    const idValue = id ? id : null;
    console.log('Inserting product with values:', { idValue, title, price, imageUrl, description });
    db.execute('INSERT INTO products (id, title, price, imageUrl, description) VALUES (?, ?, ?, ?, ?)', 
        [idValue, title, price, imageUrl, description])
        .then(result => {
            const productId = result[0].insertId;
            console.log('Product inserted with ID:', productId);
            // Fetch the newly added product from the database to send back to client
           return db.execute('SELECT * FROM products WHERE id = ?', [productId])
           })
           .then(([product]) => {
            if (product.length === 0) {
                throw new Error('Product not found');
            }
            res.status(201).json({ message: 'Product added successfully', product: product[0] });
        })
        .catch(err => {
            console.error('Error fetching newly added product:', err);
            res.status(500).json({ message: 'Failed to add product' });
        });
};