const db = require('../util/database');

module.exports = class CourseProduct {
    constructor(id, name, image, price) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.price = price;
    }

    static saveProduct(product, cb) {
        db.execute(
            'INSERT INTO products (name, image, price) VALUES (?, ?, ?)',
            [product.name, product.image, product.price]
        )
        .then(result => {
            cb(null, result);
        })
        .catch(err => {
            console.error('Error saving product:', err);
            cb(err);
        });
    }

    static fetchProducts(cb) {
        db.query('SELECT * FROM products')
        .then(([rows, fields]) => {
            cb(rows);
        })
        .catch(err => {
            console.error('Error fetching products:', err);
            cb([]);
        });
    }

    static findProductById(id, cb) {
        db.execute('SELECT * FROM products WHERE id = ?', [id])
        .then(([rows, fields]) => {
            if (rows.length > 0) {
                cb(rows[0]);
            } else {
                cb(null);
            }
        })
        .catch(err => {
            console.error('Error finding product by id:', err);
            cb(null);
        });
    }
};

