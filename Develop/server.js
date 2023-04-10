const express = require('express');
const fs = require('fs');
const path = require('path');
const database = require('./db/db.json');

const app = express();
const port = 3001;

app.use(express.static('public'));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/', function (req, res) {
    res.sendFile(path.join(_dirname, '/public/index.html'));
})

app.get('/notes', function (req, res) {
    res.sendFile(path.join(_dirname, '/public/notes.html'));
})

app.route('/api/notes')
.get(function(req, res) {
    res.json(database);
})

.post(function(req, res) {
    let jsonFilePath = path.join(_dirname, '/db/db.json');
    let newNote = req.body;
})



app.listen(port, function () {
    console.log('App listening on Port' + port)
})



