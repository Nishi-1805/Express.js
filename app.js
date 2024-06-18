const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));

// Use '/admin' prefix for admin routes
app.use('/admin', adminRoutes);

// Use '/shop' prefix for shop routes
app.use('/shop', shopRoutes);

// 404 Page Not Found Middleware
app.use((req, res, next) => {
    res.status(404).send('<h1>Page Not Found</h1>');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
