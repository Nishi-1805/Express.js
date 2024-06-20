const path = require('path');
const express = require('express');
const router = express.Router();

// Example route for shop page
router.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'shop.html'));
});

router.get('/contactus', (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'contact-us.html'));
});

module.exports = router;
