const express = require('express');
const router = express.Router();
const Cart = require('../models/cart');
const Product = require('../models/product');

router.post('/addToCart', async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const product = await Product.findByPk(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        let cartProduct = await Cart.findOne({ where: { productId } });

        if (cartProduct) {
            cartProduct.quantity += parseInt(quantity);
            await cartProduct.save();
        } else {
            cartProduct = await Cart.create({
                productId: product.id,
                name: product.title,
                price: product.price,
                image: product.imageUrl,
                quantity: parseInt(quantity)
            });
        }

        res.status(200).json({ message: 'Product added to cart successfully' });
    } catch (error) {
        console.error('Error adding to cart:', error);
        res.status(500).json({ message: 'Failed to add to cart' });
    }
});
router.get('/cart-data', async (req, res) => {
    try {
        const cartItems = await Cart.findAll();
        const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        res.json({ products: cartItems, totalPrice: totalPrice });
    } catch (err) {
        console.error('Error fetching cart data:', err);
        res.status(500).json({ message: 'Failed to retrieve cart data' });
    }
});
router.post('/edit-cart-item', async (req, res) => {
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
});
router.post('/remove-from-cart', async (req, res) => {
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
});

module.exports = router;
