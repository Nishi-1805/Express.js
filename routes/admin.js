const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products');

router.get('/add-product', productsController.getAddProduct);
router.post('/book', productsController.postAddProduct);

module.exports = router;

