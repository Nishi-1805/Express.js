//const path = require('path');
const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products');

router.get('/', productsController.getHome);
router.get('/courses', productsController.getCourses);
router.get('/hire', productsController.redirectHome);
router.get('/pricing', productsController.redirectHome);
router.get('/contact-us', productsController.getContactUs);
router.get('/products/:productId', productsController.getProductDetail);
router.post('/book', productsController.postAddProduct);
router.get('/product', productsController.getAllProducts);
router.post('/add-to-cart', productsController.postAddToCart);
router.post('/remove-from-cart', productsController.postRemoveFromCart);
router.get('/cart', productsController.getCart);

module.exports = router;
