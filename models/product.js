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
    fs.writeFile(filePath, JSON.stringify(products, null, 1), (err) => {
        if (cb) cb(err);
    });
};

const getNewProductId = (products) => {
    if (products.length === 0) {
        return 1;
    }
    const maxId = products.reduce((max, product) => Math.max(max, product.id), 0);
    return maxId + 1;
};

module.exports = class CourseProduct {
    constructor(id, name, image, price) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.price = price;
    }

    static saveProduct(product, cb) {
        getProductsFromFile((products) => {
            product.id = getNewProductId(products);
            products.push(product);
            saveProductsToFile(products, cb);
        });
    }

    static fetchProducts(cb) {
        getProductsFromFile(cb);
    }

    static findProductById(id, cb) {
        getProductsFromFile((products) => {
            const product = products.find(prod => prod.id === parseInt(id));
            cb(product);
        });
    }
};


