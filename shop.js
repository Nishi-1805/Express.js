const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products');

// Home and general routes
router.get('/', productsController.getHome);
router.get('/courses', productsController.getCourses);
router.get('/hire', productsController.redirectHome);
router.get('/add-product', productsController.getAddProductPage);
router.get('/contact-us', productsController.getContactUs);
router.post('/contact-us', productsController.postAddProduct);
router.get('/success', productsController.getSuccess);

// Product-related routes
router.get('/api/products', productsController.getAllProducts); // API endpoint for all products
router.get('/products/:productId', productsController.getProductDetail); // Single product detail
router.get('/products', productsController.getProductsPage); // Products page
router.post('/add-product', productsController.AddNewProduct);

// Cart-related routes
router.post('/addToCart', productsController.postAddToCart); // Add product to cart
router.post('/edit-cart-item', productsController.postEditCartItem); // Edit cart item
router.post('/remove-from-cart', productsController.postRemoveFromCart); // Remove from cart
router.get('/cart-data', productsController.getCart); // API endpoint for cart data
router.get('/cart', productsController.getCartPage); // Cart page

module.exports = router;

