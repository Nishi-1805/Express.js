const path = require('path');
const fs = require('fs');

const filePath = path.join(__dirname, '../data', 'courseProducts.json');

const getProductsFromFile = (cb) => {
    fs.readFile(filePath, 'utf-8', (err, fileContent) => {
        if (err) {
            cb([]);
        } else {
            try {
                cb(JSON.parse(fileContent));
            } catch (parseErr) {
                cb([]);
            }
        }
    });
};

module.exports = class CourseProduct {
    static fetchProducts(cb) {
        getProductsFromFile(cb);
    }
    static findProductById(id, cb) {
        getProductsFromFile((products) => {
            const product = products.find(prod => prod.id === parseInt(id)); // Ensure ID comparison is correct
            cb(product);
        });
    }
};