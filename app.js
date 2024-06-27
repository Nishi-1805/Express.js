const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const errorController = require('./controllers/error');
const sequelize = require('./util/database');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const successRoutes = require('./routes/success');
const cartRoutes = require('./routes/cart'); 

const app = express();
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use('/success' ,successRoutes);
app.use('/cart' ,cartRoutes); 

// Error handling middleware
app.use(errorController.get404);

sequelize
.sync()
.then(result => {
    console.log('Database synced!');
    app.listen(7000, () => {
        console.log('Server is running on port 7000');
    });
})
.catch(err => {
    console.log(err);
});


