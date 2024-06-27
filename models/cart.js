const db = require('../util/database');

module.exports = class Cart {
    static addProduct(productId, price, name, image, qty, cb) {
        db.execute('SELECT * FROM cart WHERE product_id = ?', [productId])
            .then(([rows]) => {
                if (rows.length > 0) {
                    // Product already exists in cart
                    const existingProduct = rows[0];
                    const newQty = existingProduct.quantity + qty;
                    return db.execute('UPDATE cart SET quantity = ? WHERE product_id = ?', [newQty, productId]);
                } else {
                    // Product does not exist in cart, add new product
                    return db.execute('INSERT INTO cart (product_id, name, price, image, quantity) VALUES (?, ?, ?, ?, ?)', [productId, name, price, image, qty]);
                }
            })
            .then(() => cb())
            .catch(err => cb(err));
    }

    static UpdateProductQty(productId, newQty, cb) {
        db.execute('UPDATE cart SET quantity = ? WHERE product_id = ?', [newQty, productId])
            .then(() => cb())
            .catch(err => cb(err));
    }

    static deleteProduct(productId, cb) {
        db.execute('DELETE FROM cart WHERE product_id = ?', [productId])
            .then(() => cb())
            .catch(err => cb(err));
    }

    static getCart(cb) {
        db.execute('SELECT * FROM cart')
            .then(([rows]) => {
                const cart = {
                    products: rows,
                    totalPrice: rows.reduce((sum, prod) => sum + (prod.price * prod.quantity), 0)
                };
                cb(cart);
            })
            .catch(err => cb({ products: [], totalPrice: 0 }));
    }
};
