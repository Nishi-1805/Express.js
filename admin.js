const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products');

router.get('/dashboard', (req, res) => {
    res.send('Admin Dashboard');
});

router.get('/add-product', (req, res) => {
    res.send('Admin Add Product Page');
});

router.post('/add-product', productsController.postAddProduct);


module.exports = router;

