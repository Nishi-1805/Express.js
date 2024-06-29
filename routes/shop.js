const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products');

// Home and general routes
router.get('/', productsController.getHome);
router.get('/courses', productsController.getCourses);
router.get('/hire', productsController.redirectHome);

router.get('/contact-us', productsController.getContactUs);
router.post('/contact-us', productsController.postAddProduct);
router.get('/success', productsController.getSuccess);

// Product-related routes
router.get('/api/products', productsController.getAllProducts); 
router.get('/products/:id', productsController.getProductDetail);
router.get('/products', productsController.getProductsPage); 


// Cart-related routes
router.post('/addToCart', productsController.postAddToCart); 
router.post('/edit-cart-item', productsController.postEditCartItem); 
router.post('/remove-from-cart', productsController.postRemoveFromCart);
router.get('/cart-data', productsController.getCart); 
router.get('/cart', productsController.getCartPage); 

module.exports = router;

