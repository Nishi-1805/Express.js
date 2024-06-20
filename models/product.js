const path = require('path');
const fs = require('fs');

const filePath = path.join(__dirname, '../book.txt');

// Function to fetch all products from the file
const fetchProducts = () => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                const products = data.split('\n\n').filter(product => product.trim() !== '');
                resolve(products);
            }
        });
    });
};

// Function to save a new product to the file
const saveProduct = (product) => {
    return new Promise((resolve, reject) => {
        fs.appendFile(filePath, product + '\n\n', (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
};

module.exports = {
    fetchProducts,
    saveProduct
};



