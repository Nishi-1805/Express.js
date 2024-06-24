const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const cartFilePath = path.join(__dirname, '../data', 'cart.json');

// Add to Cart
router.post('/addToCart', (req, res) => {
    const { productId, name, price, image } = req.body;

    fs.readFile(cartFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send({ message: 'Error reading cart file' });
        }

        let cart = JSON.parse(data);
        let product = cart.products.find(prod => prod.id === productId);

        if (product) {
            product.qty += 1;
        } else {
            cart.products.push({ id: productId, name: name, price: price, image: image, qty: 1 });
        }

        cart.totalPrice = cart.products.reduce((total, prod) => total + (prod.price * prod.qty), 0);

        fs.writeFile(cartFilePath, JSON.stringify(cart), 'utf8', (err) => {
            if (err) {
                return res.status(500).send({ message: 'Error writing cart file' });
            }
            res.send({ message: 'Product added to cart successfully' });
        });
    });
});

// Fetch Cart Data
router.get('/cart-data', (req, res) => {
    fs.readFile(cartFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send({ message: 'Error reading cart file' });
        }
        const cart = JSON.parse(data);
        res.json(cart);
    });
});

// Edit Cart Item
router.post('/edit-cart', (req, res) => {
    const { productId, qty } = req.body;

    fs.readFile(cartFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send({ message: 'Error reading cart file' });
        }

        let cart = JSON.parse(data);
        let product = cart.products.find(prod => prod.id === productId);

        if (product) {
            product.qty = parseInt(qty);
            cart.totalPrice = cart.products.reduce((total, prod) => total + (prod.price * prod.qty), 0);

            fs.writeFile(cartFilePath, JSON.stringify(cart), 'utf8', (err) => {
                if (err) {
                    return res.status(500).send({ message: 'Error writing cart file' });
                }
                res.send({ message: 'Cart updated successfully' });
            });
        } else {
            res.status(404).send({ message: 'Product not found in cart' });
        }
    });
});

// Remove from Cart
router.post('/remove-from-cart', (req, res) => {
    const { productId } = req.body;

    fs.readFile(cartFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send({ message: 'Error reading cart file' });
        }

        let cart = JSON.parse(data);
        cart.products = cart.products.filter(prod => prod.id !== productId);
        cart.totalPrice = cart.products.reduce((total, prod) => total + (prod.price * prod.qty), 0);

        fs.writeFile(cartFilePath, JSON.stringify(cart), 'utf8', (err) => {
            if (err) {
                return res.status(500).send({ message: 'Error writing cart file' });
            }
            res.send({ message: 'Product removed from cart successfully' });
        });
    });
});

module.exports = router;
