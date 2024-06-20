const path = require('path');
const fs = require('fs');

exports.getAddProduct = (req, res, next) => {
    res.sendFile(path.join(__dirname, '../views', 'add-product.html'));
};

exports.postAddProduct = (req, res, next) => {
    const { name, email, phone, date, time } = req.body;
    const data = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nDate: ${date}\nTime: ${time}\n\n`;
    const filePath = path.join(__dirname, '../book.txt');

    fs.appendFile(filePath, data, (err) => {
        if (err) {
            console.error('Error writing to file:', err);
            res.status(500).send('Failed to save data');
        } else {
            console.log('Data saved successfully');
            res.redirect('/success');
        }
    });
};

exports.getContactUs = (req, res, next) => {
    res.sendFile(path.join(__dirname, '../views', 'contact-us.html'));
};

exports.getHome = (req, res, next) => {
    res.sendFile(path.join(__dirname, '../views', 'shop.html'));
};

exports.redirectHome = (req, res, next) => {
    res.redirect('/');
};