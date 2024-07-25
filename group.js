const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(express.json());

let messages = [];

app.post('/send-message', (req, res) => {
    const username = req.body.username;
    const message = req.body.message;

    if (username && message) {
        messages.push({ username, message });
        fs.promises.writeFile(path.join(__dirname, 'messages.json'), JSON.stringify(messages, null, 2))
            .then(() => {
                res.json({ success: true });
            })
            .catch(error => {
                console.error('Error writing messages:', error);
                res.status(500).json({ error: 'Error writing messages' });
            });
    } else {
        res.status(400).json({ error: 'Username or message is missing' });
    }
});

app.get('/messages', (req, res) => {
    fs.promises.readFile(path.join(__dirname, 'messages.json'), 'utf8')
        .then(data => {
            if (data.trim() === '') {
                data = '[]'; // Initialize with an empty array if file is empty
            }
            try {
                messages = JSON.parse(data) || [];
            } catch (error) {
                console.error('Error parsing JSON:', error);
                messages = [];
            }
            res.json(messages);
        })
        .catch(error => {
            console.error('Error reading messages:', error);
            res.status(500).json({ error: 'Error reading messages' });
        });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

app.get('/chat', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(3000, () => {
    console.log(`Server is running on http://localhost:3000`);
});