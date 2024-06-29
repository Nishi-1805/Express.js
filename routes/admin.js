const express = require('express');
const router = express.Router();
const path = require('path');
const productsController = require('../controllers/products');

router.post('/add-product', productsController.AddNewProduct);
router.get('/add-product', productsController.getAddProductPage);
module.exports = router;

