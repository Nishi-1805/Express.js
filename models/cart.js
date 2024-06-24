const path = require('path');
const fs = require('fs');

const cartFilePath = path.join(__dirname, '../data', 'cart.json');

const getCartFromFile = (cb) => {
    fs.readFile(cartFilePath, 'utf-8', (err, fileContent) => {
        if (err) {
            cb({ products: [], totalPrice: 0 });
        } else {
            try {
                cb(JSON.parse(fileContent));
            } catch (parseErr) {
                cb({ products: [], totalPrice: 0 });
            }
        }
    });
};

const saveCartToFile = (cart, cb) => {
    fs.writeFile(cartFilePath, JSON.stringify(cart, null, 2), (err) => {
        if (cb) cb(err);
    });
};

module.exports = class Cart {
    static addProduct(id, price, name, image, cb) {
        getCartFromFile(cart => {
            const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
            if (existingProductIndex !== -1) {
                // Product already exists in cart
                const existingProduct = cart.products[existingProductIndex];
                const updatedProduct = { ...existingProduct, qty: existingProduct.qty + 1 };
                cart.products[existingProductIndex] = updatedProduct;
            } else {
                // Product does not exist in cart, add new product
                const newProduct = { id, name, price, image, qty: 1 }; // Start qty from 1
                cart.products.push(newProduct);
            }
            cart.totalPrice += parseFloat(price);
            saveCartToFile(cart, cb);
        });
    }

    static editProduct(id, newQty, cb) {
        getCartFromFile(cart => {
            const productIndex = cart.products.findIndex(prod => prod.id === id);
            if (productIndex !== -1) {
                // Product found in cart, update quantity and total price
                const product = cart.products[productIndex];
                const oldQty = product.qty;
                const productPrice = parseFloat(product.price);
                cart.totalPrice += (newQty - oldQty) * productPrice; // Update total price
                product.qty = newQty; // Update product quantity
                saveCartToFile(cart, cb); // Save updated cart to file
            } else {
                // Handle case where product with given id is not found
                cb(new Error('Product not found in cart'));
            }
        });
    }
    static deleteProduct(id,productPrice, cb) {
        getCartFromFile(cart => {
            const productIndex = cart.products.findIndex(prod => prod.id === id);
            if (productIndex !== -1) {
                // Product found in cart, remove it and update total price
                const product = cart.products[productIndex];
                cart.totalPrice -= parseFloat(productPrice) * product.qty; // Update total price
                cart.products.splice(productIndex, 1); // Remove product from array
                saveCartToFile(cart, cb); // Save updated cart to file
            } else {
                // Handle case where product with given id is not found
                cb(new Error('Product not found in cart'));
            }
        });
    }

    static getCart(cb) {
        getCartFromFile(cb);
    }
};
