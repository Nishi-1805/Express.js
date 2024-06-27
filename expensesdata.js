// app.js or index.js
const express = require('express');
const app = express();
const path = require('path');
const sequelize = require('./util/database');
const expenseRoutes = require('./routes/expenseRoutes');

app.use(express.json());
app.use('/expenses', expenseRoutes);
app.use(express.static( 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'expense.html')); 
});

sequelize.sync()
    .then(result => {
        console.log('Database synced');
    })
    .catch(err => {
        console.log(err);
    });


// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
