const express = require('express');
const router = express.Router();
const successController = require('../controllers/success1');

router.get('/success', successController.getSuccess);

module.exports = router;
