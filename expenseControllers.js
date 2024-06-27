// controllers/expenseController.js
const Expense = require('../models/expense');

exports.createExpense = (req, res, next) => {
    const {date, description, amount } = req.body;
    Expense.create({date, description, amount })
        .then(result => {
            res.status(201).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Failed to create expense' });
        });
};

exports.getAllExpenses = (req, res, next) => {
    Expense.findAll()
        .then(expenses => {
            res.json(expenses);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Failed to fetch expenses' });
        });
};

exports.deleteExpense = (req, res, next) => {
    const expenseId = req.params.id;
    Expense.findByPk(expenseId)
        .then(expense => {
            if (!expense) {
                return res.status(404).json({ message: 'Expense not found' });
            }
            return expense.destroy();
        })
        .then(result => {
            res.json({ message: 'Expense deleted successfully' });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Failed to delete expense' });
        });
};

exports.editExpense = (req, res, next) => {
    const expenseId = req.params.id;
    const {date, description, amount } = req.body;

    Expense.findByPk(expenseId)
        .then(expense => {
            if (!expense) {
                return res.status(404).json({ message: 'Expense not found' });
            }
            expense.date= date;
            expense.description = description;
            expense.amount = amount;
            return expense.save();
        })
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Failed to edit expense' });
        });
};

exports.getExpenseById = (req, res, next) => {
    const expenseId = req.params.id;

    Expense.findByPk(expenseId)
        .then(expense => {
            if (!expense) {
                return res.status(404).json({ message: 'Expense not found' });
            }
            res.json(expense);
        })
        .catch(err => {
            console.error('Error fetching expense:', err);
            res.status(500).json({ message: 'Failed to fetch expense' });
        });
};
