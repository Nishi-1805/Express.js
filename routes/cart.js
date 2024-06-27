const express = require('express');
const router = express.Router();
const Cart = require('../models/cart');
const db = require('../util/database');

// Add to Cart
router.post('/addToCart', (req, res) => {
    const { productId, name, price, image, qty } = req.body;

    Cart.addProduct(productId, price, name, image, qty, (err) => {
        if (err) {
            return res.status(500).send({ message: 'Error adding product to cart' });
        }
        res.send({ message: 'Product added to cart successfully' });
    });
});

// Fetch Cart Data
router.get('/cart-data', (req, res) => {
    Cart.getCart((cart) => {
        res.json(cart);
    });
});

// Edit Cart Item
router.post('/edit-cart-item', (req, res) => {
    const { productId, qty } = req.body;

    Cart.updateProductQty(productId, qty, (err) => {
        if (err) {
            return res.status(500).send({ message: 'Error updating cart item' });
        }
        res.send({ message: 'Cart updated successfully' });
    });
});

// Remove from Cart
router.post('/remove-from-cart', (req, res) => {
    const { productId } = req.body;

    if (!productId) {
        return res.status(400).json({ message: 'ProductId is required' });
    }

    Cart.deleteProduct(productId, (err) => {
        if (err) {
            console.error('Error removing from cart:', err);
            return res.status(500).json({ message: 'Failed to remove product from cart' });
        }
        res.status(200).json({ message: 'Product removed from cart successfully' });
    });
});
module.exports = router;