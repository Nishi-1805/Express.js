const path = require('path');
const fs = require('fs');
const Product = require('../models/product');
const Cart = require('../models/cart');
const CourseProduct = require('../models/CourseProduct');
const Contact = require('../models/Contact');
const User = require('../models/User');

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
// Get product details by ID
exports.getAllProducts = (req, res, next) => {
    Product.findAll()
        .then(products => {
            res.json(products);
        })
        .catch(err => {
            console.log('Failed to retrieve products:', err);
            res.status(500).json({ error: 'Failed to retrieve products' });
        });
};

// Get product details by ID
exports.getProductDetail = (req, res, next) => {
    const productId = req.params.id;
    Product.findByPk(productId)
        .then(product => {
            if (product) {
                res.json(product);
            } else {
                res.status(404).json({ error: 'Product not found' });
            }
        })
        .catch(err => {
            console.log(`Failed to retrieve product with ID ${productId}:`,err);
            res.status(500).json({ error: 'Failed to retrieve product' });
        });
};
exports.getProductsPage = (req, res, next) => {
    res.sendFile(path.join(__dirname, '../views', 'products.html'));
};

exports.postAddToCart = async (req, res, next) => {
    const { productId,name, price, image,qty } = req.body;
    
    try {
        const existingProduct = await Cart.findOne({ where: { productId: productId } });

        if (existingProduct) {
            // Product already exists in cart, update quantity
            existingProduct.quantity += parseInt(qty);
            await existingProduct.save();
        } else {
            // Product does not exist in cart, add new product
            existingProduct =await Cart.create({
                productId: productId,
                name: name,
                price: price,
                image: image,
                quantity: parseInt(qty)
            });
        }

        res.status(200).json({ message: 'Product added to cart successfully' });
    } catch (err) {
        console.error('Error adding product to cart:', err);
        res.status(500).json({ message: 'Failed to add product to cart' });
    }
};
// Handle editing a product in cart (POST)
exports.postEditCartItem = async (req, res, next) => {
    const productId = req.params.id;
    const { title, price, imageUrl, description } = req.body;
    try {
        const product = await Product.findByPk(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        product.title = title;
        product.price = price;
        product.imageUrl = imageUrl;
        product.description = description;

        await product.save();

        res.json({ message: 'Product updated successfully', product: product });
    } catch (err) {
        console.error('Error updating product:', err);
        res.status(500).json({ message: 'Failed to update product' });
    }
};

// Handle removing a product from cart
exports.postRemoveFromCart = async (req, res, next) => {
    const productId = req.params.id;
    try {
        const product = await Product.findByPk(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        await product.destroy();
        res.json({ message: 'Product deleted successfully' });
    } catch (err) {
        console.error('Error deleting product:', err);
        res.status(500).json({ message: 'Failed to delete product' });
    }
};

// Fetch all cart items and calculate total price
exports.getCart = async (req, res, next) => {
    try {
        const cartItems = await Cart.findAll();
        const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        res.json({ products: cartItems, totalPrice: totalPrice });
    } catch (err) {
        console.error('Error fetching cart data:', err);
        res.status(500).json({ message: 'Failed to retrieve cart data' });
    }
};
// Render cart page
exports.getCartPage = (req, res, next) => {
    res.sendFile(path.join(__dirname, '../views', 'cart.html'));
};

// Handle adding a product (POST)
exports.postAddProduct = async (req, res, next) => {
    const { name, email, phone, date, time } = req.body;

    try {
        const newContact = await Contact.create({
            name: name,
            email: email,
            phone: phone,
            time: time,
            date: date,
        });

        res.redirect('/success'); 
    } catch (err) {
        console.error('Error saving contact:', err);
        res.status(500).json({ message: 'Failed to save contact' });
    }
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
    CourseProduct.fetchProducts()
    .then(products => {
        res.sendFile(path.join(__dirname, '../views', 'courses.html'));
    })
    .catch(err => {
        console.error('Error fetching course products:', err);
        res.status(500).json({ error: 'Failed to retrieve course products' });
    });
};

exports.AddNewProduct = async(req, res, next) => {
    const { title, price, imageUrl, description } = req.body;
    try {
        const user = req.user; // Assuming user is authenticated and added to req object
        
        const newProduct = await Product.create({
            title: title,
            price: price,
            imageUrl: imageUrl,
            description: description,
            userId: user.id // Associate the product with the authenticated user
        });

        res.status(201).json({ message: 'Product created successfully', product: newProduct });
    } catch (err) {
        console.error('Error creating product:', err);
        res.status(500).json({ message: 'Failed to create product' });
    }
};

exports.getProductsByUser = async (req, res, next) => {
    const userId = req.params.userId;
    try {
        const products = await Product.findAll({ where: { userId: userId } });
        res.json(products);
    } catch (err) {
        console.error('Error fetching products:', err);
        res.status(500).json({ message: 'Failed to fetch products' });
    }
};

exports.createCart = async (req, res) => {
    const { productId, quantity } = req.body;
    
    try {
        const cart = await Cart.create({
            userId: req.user.id,
            productId: productId,
            quantity: quantity  // Ensure quantity is provided in the request body
            // Other fields as necessary
        });

        res.status(201).json(cart);
    } catch (err) {
        console.error('Error creating cart:', err);
        res.status(500).json({ message: 'Failed to create cart' });
    }
};
exports.updateCart = async (req, res) => {
    const cartId = req.params.cartId;
    const { productId, quantity } = req.body;

    try {
        const cart = await Cart.findByPk(cartId);

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Update the cart instance
        cart.productId = productId;
        cart.quantity = quantity;  // Ensure quantity is updated
        // Update other fields as necessary

        await cart.save();

        res.status(200).json(cart);
    } catch (err) {
        console.error('Error updating cart:', err);
        res.status(500).json({ message: 'Failed to update cart' });
    }
};