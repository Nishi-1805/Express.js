const expenseForm = document.getElementById('expenseForm');
const expenseList = document.getElementById('expenseList');
let editingExpenseId = null;
// Function to fetch expenses from server and display
async function fetchExpenses() {
    try {
        const response = await fetch('/expenses');
        if (!response.ok) {
            throw new Error('Failed to fetch expenses');
        }
        const expenses = await response.json();
        displayExpenses(expenses);
    } catch (error) {
        console.error('Error fetching expenses:', error);
    }
}

// Function to display expenses in the UI
function displayExpenses(expenses) {
    expenseList.innerHTML = '';
    expenses.forEach(expense => {
        const expenseItem = document.createElement('div');
        expenseItem.classList.add('expense-item');
        expenseItem.innerHTML = `
            <p><strong>Description:</strong> ${expense.description}</p>
            <p><strong>Amount:</strong> ${expense.amount}</p>
            <p><strong>Date:</strong> ${new Date(expense.date).toLocaleDateString()}</p>
            <button onclick="deleteExpense(${expense.id})">Delete</button>
            <button onclick="editExpense(${expense.id})">Edit</button>
        `;
        expenseList.appendChild(expenseItem);
    });
}

// Function to handle form submission (add expense)
expenseForm.addEventListener('submit', async function(event) {
    event.preventDefault();
    const formData = new FormData(expenseForm);
    const date = formData.get('date');
    const description = formData.get('description');
    const amount = formData.get('amount');
    try {
        let response;
    if (editingExpenseId) {
        // Update existing expense
        response = await fetch(`/expenses/${editingExpenseId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ date, description, amount })
        });
    } else {
        // Add new expense
        response = await fetch('/expenses/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ date, description, amount })
        });
    }
    if (!response.ok) {
        throw new Error('Failed to save expense');
    }
    fetchExpenses(); // Refresh expense list after adding/updating
    expenseForm.reset();
    resetFormAction(); // Reset form action and button text
} catch (error) {
    console.error('Error saving expense:', error);
}
});

// Function to delete an expense
async function deleteExpense(id) {
    try {
        const response = await fetch(`/expenses/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Failed to delete expense');
        }
        fetchExpenses(); // Refresh expense list after deleting
    } catch (error) {
        console.error('Error deleting expense:', error);
    }
}

function resetFormAction() {
    editingExpenseId = null;
    expenseForm.removeAttribute('action');
    const submitButton = expenseForm.querySelector('button[type="submit"]');
    submitButton.textContent = 'Add Expense';
}

// Function to edit an expense (optional)
async function editExpense(id) {
    try {
        // Fetch expense details by ID
        const response = await fetch(`/expenses/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch expense details');
        }
        const expense = await response.json();

        // Populate form fields with expense details
        document.getElementById('date').value = expense.date.split('T')[0];
        document.getElementById('description').value = expense.description;
        document.getElementById('amount').value = expense.amount;
        editingExpenseId = id;

        // Change submit button text
        const submitButton = expenseForm.querySelector('button[type="submit"]');
        submitButton.textContent = 'Update Expense';

    } catch (error) {
        console.error('Error fetching expense details:', error);
    }
}


// Fetch initial expenses on page load
fetchExpenses();
