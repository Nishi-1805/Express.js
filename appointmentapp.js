const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const sequelize = require('./util/database');
const dataRoutes = require('./routes/appointment-data');

const app = express();
const PORT = process.env.PORT || 9000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(dataRoutes);

const Appointment = require('./models/appointment');


// Route to display form
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'appointments.html')); 
});

sequelize.sync() // This will create the necessary tables if they don't exist
    .then(() => {
        console.log('Database connected and tables synced');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
