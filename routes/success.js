const express = require('express');
const router = express.Router();
const successController = require('../controllers/success');

router.get('/success', successController.getSuccess);

module.exports = router;
