// routes/expenseRoutes.js
const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseControllers');

// Create expense
router.post('/create', expenseController.createExpense);

// Get all expenses
router.get('/', expenseController.getAllExpenses);

// Get expense by ID
router.get('/:id', expenseController.getExpenseById); 

// Delete expense
router.delete('/:id', expenseController.deleteExpense);

// Edit expense (optional)
router.put('/:id', expenseController.editExpense);

module.exports = router;
