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
//router.get('/success', productsController.getSuccess);

module.exports = router;
