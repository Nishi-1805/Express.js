const path = require('path');
const express = require('express');
const router = express.Router();
const fs = require('fs');

router.post('/book', (req, res, next) => {
    const { name, email, phone, date, time } = req.body;
    const data = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nDate: ${date}\nTime: ${time}\n\n`;

    const filePath = path.join(__dirname, '../book.txt');

    fs.appendFile(filePath, data, (err) => {
        if (err) {
            console.error('Error writing to file:', err);
            res.status(500).send('Failed to save data');
        } else {
            console.log('Data saved successfully');
            //res.send('Form Submitted Successfully');
            setTimeout(()=>{
                res.redirect('/');
            },1500);
        }
    });
});

module.exports = router;

