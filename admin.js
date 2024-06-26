const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products');

router.get('/add-product', (req, res) => {
    res.sendFile(path.join(__dirname, '../views', 'add-product.html'));
});
router.post('/add-product', productsController.AddNewProduct);
router.get('/add-product', productsController.getAddProductPage);
module.exports = router;

