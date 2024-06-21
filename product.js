const path = require('path');
const fs = require('fs');

const filePath = path.join(__dirname, '../data', 'products.json');

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

const saveProductsToFile = (products, cb) => {
    fs.writeFile(filePath, JSON.stringify(products, null, 2), (err) => {
        if (cb) cb(err);
    });
};


let productIdCounter = 0;

exports.saveProduct = (product, cb) => {
    getProductsFromFile((products) => {
        product.id = ++productIdCounter;
        products.push(product);
        saveProductsToFile(products, cb);
    });
};

exports.fetchProducts = (cb) => {
    getProductsFromFile(cb);
};

exports.findProductById = (id, cb) => {
    getProductsFromFile((products) => {
        const product = products.find(prod => prod.id === parseInt(id));
        cb(product);
    });
};




