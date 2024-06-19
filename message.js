//const express = require('express');
//const bodyParser = require('body-parser');
//const fs = require('fs');
//const path = require('path');

//const app = express();
//const PORT = 3000;
//const messagesFilePath = path.join(__dirname, 'messages.json');

// Middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve login page
app.get('/login', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Login</title>
        </head>
        <body>
            <h1>Login</h1>
            <form action="/login" method="POST" onsubmit="saveUsername()">
                <label for="username">Username:</label>
                <input type="text" id="username" name="username" required>
                <button type="submit">Login</button>
            </form>
            <script>
                function saveUsername(){
                    const username = document.getElementById('username').value;
                    localStorage.setItem('username', username);
                }
            </script>
        </body>
        </html>
    `);
});

// Serve chat page
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Chat Room</title>
        </head>
        <body>
            <h1>Chat Room</h1>
            <form action="/send" method="POST" onsubmit="addUsernametoChat()">
                <input type="hidden" name="username" id="username">
                <label for="message">Message:</label>
                <input type="text" name="message" id="message" required>
                <button type="submit">Send</button>
            </form>
            <h2>Messages</h2>
            <ul id="messages"></ul>
            <script>
                document.addEventListener("DOMContentLoaded", () => {
                    const storedUsername = localStorage.getItem('username');
                    if (!storedUsername) {
                        window.location.href = '/login';
                    } else {
                        document.getElementById('username').value = storedUsername;
                        fetchMessages();
                    }
                });

                function addUsernametoChat() {
                    const storedUsername = localStorage.getItem('username');
                    document.getElementById('username').value = storedUsername;
                }

                function fetchMessages() {
                    fetch('/messages')
                        .then(response => response.json())
                        .then(messages => {
                            const messagesList = document.getElementById('messages');
                            messagesList.innerHTML = '';
                            messages.forEach(msg => {
                                const msgElement = document.createElement('li');
                                msgElement.textContent = \`\${msg.username}: \${msg.message}\`;
                                messagesList.appendChild(msgElement);
                            });
                        });
                }

                // Fetch new messages every second
                setInterval(fetchMessages, 1000);
            </script>
        </body>
        </html>
    `);
});

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
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

//const app = express();
//const PORT = 3000;
//const messagesFilePath = path.join(__dirname, 'messages.json');

// Middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve login page
app.get('/login', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Login</title>
        </head>
        <body>
            <h1>Login</h1>
            <form action="/login" method="POST" onsubmit="saveUsername()">
                <label for="username">Username:</label>
                <input type="text" id="username" name="username" required>
                <button type="submit">Login</button>
            </form>
            <script>
                function saveUsername(){
                    const username = document.getElementById('username').value;
                    localStorage.setItem('username', username);
                }
            </script>
        </body>
        </html>
    `);
});

// Serve chat page
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Chat Room</title>
        </head>
        <body>
            <h1>Chat Room</h1>
            <form action="/send" method="POST" onsubmit="addUsernametoChat()">
                <input type="hidden" name="username" id="username">
                <label for="message">Message:</label>
                <input type="text" name="message" id="message" required>
                <button type="submit">Send</button>
            </form>
            <h2>Messages</h2>
            <ul id="messages"></ul>
            <script>
                document.addEventListener("DOMContentLoaded", () => {
                    const storedUsername = localStorage.getItem('username');
                    if (!storedUsername) {
                        window.location.href = '/login';
                    } else {
                        document.getElementById('username').value = storedUsername;
                        fetchMessages();
                    }
                });

                function addUsernametoChat() {
                    const storedUsername = localStorage.getItem('username');
                    document.getElementById('username').value = storedUsername;
                }

                function fetchMessages() {
                    fetch('/messages')
                        .then(response => response.json())
                        .then(messages => {
                            const messagesList = document.getElementById('messages');
                            messagesList.innerHTML = '';
                            messages.forEach(msg => {
                                const msgElement = document.createElement('li');
                                msgElement.textContent = \`\${msg.username}: \${msg.message}\`;
                                messagesList.appendChild(msgElement);
                            });
                        });
                }

                // Fetch new messages every second
                setInterval(fetchMessages, 1000);
            </script>
        </body>
        </html>
    `);
});

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

// Serve login page
app.get('/login', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Login</title>
        </head>
        <body>
            <h1>Login</h1>
            <form action="/login" method="POST" onsubmit="saveUsername()">
                <label for="username">Username:</label>
                <input type="text" id="username" name="username" required>
                <button type="submit">Login</button>
            </form>
            <script>
                function saveUsername(){
                    const username = document.getElementById('username').value;
                    localStorage.setItem('username', username);
                }
            </script>
        </body>
        </html>
    `);
});

// Serve chat page
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Chat Room</title>
        </head>
        <body>
            <h1>Chat Room</h1>
            <form action="/send" method="POST" onsubmit="addUsernametoChat()">
                <input type="hidden" name="username" id="username">
                <label for="message">Message:</label>
                <input type="text" name="message" id="message" required>
                <button type="submit">Send</button>
            </form>
            <h2>Messages</h2>
            <ul id="messages"></ul>
            <script>
                document.addEventListener("DOMContentLoaded", () => {
                    const storedUsername = localStorage.getItem('username');
                    if (!storedUsername) {
                        window.location.href = '/login';
                    } else {
                        document.getElementById('username').value = storedUsername;
                        fetchMessages();
                    }
                });

                function addUsernametoChat() {
                    const storedUsername = localStorage.getItem('username');
                    document.getElementById('username').value = storedUsername;
                }

                function fetchMessages() {
                    fetch('/messages')
                        .then(response => response.json())
                        .then(messages => {
                            const messagesList = document.getElementById('messages');
                            messagesList.innerHTML = '';
                            messages.forEach(msg => {
                                const msgElement = document.createElement('li');
                                msgElement.textContent = \`\${msg.username}: \${msg.message}\`;
                                messagesList.appendChild(msgElement);
                            });
                        });
                }

                // Fetch new messages every second
                setInterval(fetchMessages, 1000);
            </script>
        </body>
        </html>
    `);
});

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
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

//const app = express();
//const PORT = 3000;
//const messagesFilePath = path.join(__dirname, 'messages.json');

// Middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve login page
app.get('/login', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Login</title>
        </head>
        <body>
            <h1>Login</h1>
            <form action="/login" method="POST" onsubmit="saveUsername()">
                <label for="username">Username:</label>
                <input type="text" id="username" name="username" required>
                <button type="submit">Login</button>
            </form>
            <script>
                function saveUsername(){
                    const username = document.getElementById('username').value;
                    localStorage.setItem('username', username);
                }
            </script>
        </body>
        </html>
    `);
});

// Serve chat page
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Chat Room</title>
        </head>
        <body>
            <h1>Chat Room</h1>
            <form action="/send" method="POST" onsubmit="addUsernametoChat()">
                <input type="hidden" name="username" id="username">
                <label for="message">Message:</label>
                <input type="text" name="message" id="message" required>
                <button type="submit">Send</button>
            </form>
            <h2>Messages</h2>
            <ul id="messages"></ul>
            <script>
                document.addEventListener("DOMContentLoaded", () => {
                    const storedUsername = localStorage.getItem('username');
                    if (!storedUsername) {
                        window.location.href = '/login';
                    } else {
                        document.getElementById('username').value = storedUsername;
                        fetchMessages();
                    }
                });

                function addUsernametoChat() {
                    const storedUsername = localStorage.getItem('username');
                    document.getElementById('username').value = storedUsername;
                }

                function fetchMessages() {
                    fetch('/messages')
                        .then(response => response.json())
                        .then(messages => {
                            const messagesList = document.getElementById('messages');
                            messagesList.innerHTML = '';
                            messages.forEach(msg => {
                                const msgElement = document.createElement('li');
                                msgElement.textContent = \`\${msg.username}: \${msg.message}\`;
                                messagesList.appendChild(msgElement);
                            });
                        });
                }

                // Fetch new messages every second
                setInterval(fetchMessages, 1000);
            </script>
        </body>
        </html>
    `);
});

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
