const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get('/login', (req, res)=>{
    res.sendFile(path.join(__dirname, 'login.html'));
});

app.post('/login', (req, res)=>{
    const {username} = req.body;
    res.redirect('/');
})

app.get('/', (req, res)=>{
    const username = localStorage.getItem('username');
    if(!username){
        res.redirect('/login');
    }
    else{
        res.sendFile(path.join(__dirname, 'chat.html'));
    }; 
});

app.post('/send', (req, res)=>{
    const {username, message} = req.body;
    const newMessage = {username, message};

    fs.readFile('message.json', (err, data)=>{
        let messages = [];
        if(!err){
            messages = JSON.parse(data);
        }
        messages.push(newMessage);
        fs.writeFile('message.json', JSON.stringify(messages), (err)=>{
            if(err) throw err;
        })
    })
    res.redirect('/');
})
app.get('/messages', (req, res)=>{
    fs.readFile('message.json', (err, data)=>{
        if (err){
            return res.join([]);
        };
        res.join(JSON.parse(data));
    });
});
app.listen(3000,()=>{
    console.log('Server is running on localhost:3000');
})