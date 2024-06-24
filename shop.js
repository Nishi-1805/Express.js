const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products');

router.get('/', productsController.getHome);

router.get('/courses', productsController.getCourses);

router.get('/hire', productsController.redirectHome);

router.get('/pricing', productsController.redirectHome);

router.get('/contact-us', productsController.getContactUs);

router.post('/contact-us', productsController.postAddProduct);

router.get('/success', productsController.getSuccess);

router.get('/api/products', productsController.getAllProducts);

//router.post('/cart', productsController.postAddToCart); // Adds a product to the cart

router.get('/products/:productId', productsController.getProductDetail);

router.post('/edit-cart', productsController.postEditCartItem);

router.post('/addToCart', productsController.postAddToCart); // This might be redundant with /cart

router.post('/remove-from-cart', productsController.postRemoveFromCart);

router.get('/cart-data', productsController.getCart); // Serves cart data for API requests

router.get('/cart', productsController.getCartPage); // Serves the cart page

router.get('/products/data', productsController.getAllProducts);

router.get('/products', productsController.getProductsPage);

module.exports = router;
