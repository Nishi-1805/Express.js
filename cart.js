const path = require('path');
const fs = require('fs');

const cartFilePath = path.join(__dirname, '../data', 'cart.json'); // Define cartFilePath here

const getCartFromFile = (cb) => {
    fs.readFile(cartFilePath, 'utf-8', (err, fileContent) => {
        if (err) {
            console.error('Error reading cart file:', err);
            return cb(err, { products: [], totalPrice: 0 }); 
        } try {
            const cart = JSON.parse(fileContent);
            cb(null, cart);
        } catch (parseErr) {
            console.error('Error parsing cart JSON:', parseErr);
            cb(parseErr, { products: [], totalPrice: 0 });
        }
    });
};

const saveCartToFile = (cart, cb) => {
    fs.writeFile(cartFilePath, JSON.stringify(cart, null, 2), (err) => {
        if (err) {
            cb(err);
        } else {
            cb(null);
        }
    });
};

let cart = {
    products: [],
    totalPrice: 0
};

module.exports = class Cart {
    static addProduct(id, price, cb) {
        // Fetch the cart
        getCartFromFile((err, cart) => {
            if (err) {
                console.error('Error reading cart file:', err);
                return cb(err);
            }
            // Analyze the cart, find existing products
            const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
            const existingProduct = cart.products[existingProductIndex];

            // Adding new product
            let updatedProduct;
            if (existingProduct) {
                updatedProduct = { ...existingProduct };
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct;
            } else {
                updatedProduct = { id: id, qty: 1 };
                cart.products = [...cart.products, updatedProduct];
            }
            cart.totalPrice = cart.totalPrice + +price;

            // Save cart back to file
            saveCartToFile(cart, err => {
                if (err) {
                    console.error('Error saving cart:', err);
                    return cb(err);
                }
                cb(null);
            });
        });
    }

    static deleteProduct(id, price, cb) {
        // Fetch the cart
        getCartFromFile((err, cart) => {
            if (err) {
                console.error('Error reading cart file:', err);
                return cb(err);
            }
            // Analyze the cart, find existing products
            const updatedCart = { ...cart };
            const product = updatedCart.products.find(prod => prod.id === id);

            if (!product) {
                return cb(null);
            }

            // Filtering the cart
            updatedCart.products = updatedCart.products.filter(prod => prod.id !== id);
            updatedCart.totalPrice = updatedCart.totalPrice - product.qty * price;

            // Save cart back to file
            saveCartToFile(updatedCart, err => {
                if (err) {
                    console.error('Error saving cart:', err);
                    return cb(err);
                }
                cb(null);
            });
        });
    }

    static getCart(cb) {
        getCartFromFile((err, cart) => {
            if (err) {
                console.error('Error reading cart file:', err);
                return cb(err);
            }
            cb(cart);
        });
    }
};
