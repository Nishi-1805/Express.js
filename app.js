const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const errorController = require('./controllers/error');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const successRoutes = require('./routes/success');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(successRoutes);

// Error handling middleware
app.use(errorController.get404);

const port = process.env.PORT || 7000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
