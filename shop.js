const path = require('path');
const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products');

router.get('/', productsController.getHome);
router.get('/courses', productsController.redirectHome);
router.get('/hire', productsController.redirectHome);
router.get('/pricing', productsController.redirectHome);
router.get('/contact-us', productsController.getContactUs);

module.exports = router;
