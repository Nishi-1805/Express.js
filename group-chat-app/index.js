const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const messagesFilePath = path.join(__dirname, 'messages.json');

// Middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files (HTML, CSS, JS)
app.use(express.static(__dirname));

// Route to handle login form submission
app.post('/login', (req, res) => {
    // Simply redirect to the chat page after login
    res.redirect('/');
});

// Route to handle chat form submission
app.post('/send', (req, res) => {
    const { username, message } = req.body;

    // Read existing messages
    fs.readFile(messagesFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading messages file.');
        }

        const messages = data ? JSON.parse(data) : [];
        messages.push({ username, message });

        // Save updated messages to file
        fs.writeFile(messagesFilePath, JSON.stringify(messages), (err) => {
            if (err) {
                return res.status(500).send('Error saving message.');
            }
            res.redirect('/');
        });
    });
});

// Route to get messages
app.get('/messages', (req, res) => {
    fs.readFile(messagesFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading messages file.');
        }
        const messages = data ? JSON.parse(data) : [];
        res.json(messages);
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).send('<h1>Page Not Found</h1>');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
