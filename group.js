const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());

let messages = [];

app.post('/send-message', (req, res) => {
    const { username, message } = req.body;
    messages.push({ username, message });

    fs.writeFile(path.join(__dirname, 'messages.json'), JSON.stringify(messages, null, 2))
        .then(() => {
            console.log('Message stored successfully');
            res.json({ success: true });
        })
        .catch(error => {
            console.error('Error storing message:', error);
            res.status(500).json({ error: 'Error storing message' });
        });
});

app.get('/messages', (req, res) => {
   
    fs.readFile(path.join(__dirname, 'messages.json'), 'utf8')
        .then(data => {
            messages = JSON.parse(data);
            res.json(messages);
        })
        .catch(error => {
            console.error('Error reading messages:', error);
            res.status(500).json({ error: 'Error reading messages' });
        });
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
