const path = require('path');
const fs = require('fs');
const Product = require('../models/product');
const Cart = require('../models/cart');
const CourseProduct = require('../models/CourseProduct');
const Contact = require('../models/Contact');

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
    const { productId, newQty } = req.body;

    try {
        const cartItem = await Cart.findOne({ where: { productId: productId } });

        if (!cartItem) {
            return res.status(404).json({ message: 'Product not found in cart' });
        }

        cartItem.quantity = parseInt(newQty);
        await cartItem.save();

        res.json({ message: 'Cart item updated successfully' });
    } catch (err) {
        console.error('Error updating cart item:', err);
        res.status(500).json({ message: 'Failed to update cart item' });
    }
};

// Handle removing a product from cart
exports.postRemoveFromCart = async (req, res, next) => {
    const { productId } = req.body;

    try {
        const cartItem = await Cart.findOne({ where: { productId: productId } });

        if (!cartItem) {
            return res.status(404).json({ message: 'Product not found in cart' });
        }

        await cartItem.destroy();
        res.json({ message: 'Product removed from cart successfully' });
    } catch (err) {
        console.error('Error removing from cart:', err);
        res.status(500).json({ message: 'Failed to remove product from cart' });
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

exports.AddNewProduct = (req, res, next) => {
    console.log(req.body);
    const {id, title, price, imageUrl, description } = req.body;

   Product.create({
    id:id,
    title:title,
    price:price,
    imageUrl:imageUrl,
    description:description
   })
   .then(result => {
    console.log('Product created successfully:', result);
    res.redirect('/'); // Redirect to home or products page after successful creation
})
.catch(err => {
    console.error('Error creating product:', err);
    res.status(500).send('Internal Server Error');
});
};