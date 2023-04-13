const express = require('express');
const fs = require('fs');
const path = require('path');
const database = require('./db/db.json');
const uuidv1 = require('uuidv1');
const { allowedNodeEnvironmentFlags } = require('process');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static('public'));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

const readAndAppend = (content, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        const parsedData = JSON.parse(data);
        parsedData.push(content);
        writeToFile(file, parsedData);
      }
    });
}

    const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );




    const util = require('util');
    const readFromFile = util.promisify(fs.readFile);

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, './public/index.html'));
})

app.get('/notes', function (req, res) {
    res.sendFile(path.join(__dirname, './public/notes.html'));
})

app.get('/api/notes', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

app.post('/api/notes', (req, res) => {
  //  let jsonFilePath = path.join(_dirname, '/db/db.json');
    const { title, text } = req.body;
    
        const newNote = { title, text, id: uuidv1() };

    
    readAndAppend(newNote, './db/db.json');
    res.json("is this working")
})


// res.json(newNote);

// app.delete('/api/notes/:id', function (req, res) {
//     let jsonFilePath = path.join(_dirname, '/db/db.json')
//     for (let i = 0; i < database.length; i++) {
//         if (database[i].id == req.params.id) {
//             database.
//         }
//     }
// })



app.listen(PORT, function () {
    console.log('App listening on Port' + PORT)
})



