const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const errorController = require('./controllers/error');
const sequelize = require('./util/database');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const successRoutes = require('./routes/success');
const cartRoutes = require('./routes/cart'); 

const Product = require('./models/product');
const User = require('./models/User');
const Cart = require('./models/cart');
const CartItem = require('./models/cartItems');

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next)=>{
    User.findByPk(1)
    .then(user=>{
        req.user = user;
        next();
    }).catch(err=>{console.log(err)});
})

app.use('/admin', adminRoutes);
app.use('/', shopRoutes);
app.use('/success' ,successRoutes);
app.use('/cart' ,cartRoutes); 

app.use(errorController.get404);

Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'});
User.hasMany(Product);
User.hasOne(Cart)
Cart.belongsTo(User);
Cart.belongsToMany(Product, {through: CartItem});
Product.belongsToMany(Cart, {through: CartItem});

sequelize
.sync()
.then(result => {
  return User.findByPk(1);
})
.then(user=>{
    if(!user){
        return User.create({name: 'FangLeng', email: 'fang@gmail.com'})
    }
    return user;
})
.then(user=>{
    return user.createCart();
})
.then(cart=>{
    app.listen(7000, () => {
        console.log('Server is running on port 7000');
    });
})
.catch(err => {
    console.log(err);
});


