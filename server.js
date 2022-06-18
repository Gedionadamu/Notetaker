//imports all required modules
const express = require('express');
const path = require('path');
const db = require('./db/db.json')
const fs = require('fs');
const crypto = require('crypto');


const app = express();
// selects process port
const PORT = process.env.PORT || 3001;


app.use(express.json());
app.use(express.static('public'));
// creates route to index.html
app.get('/', (req, res) => res.sendFile(path.join(__dirname,'public/index.html')));
//creates route to index.html
app.get('/notes', (req,res)=> res.sendFile(path.join(__dirname,'public/notes.html')));
// gets thejson data base
app.get('/api/notes',(req,res) => res.json(db));
//posts to the notes route and updates the data base and rendered html
app.post('/api/notes',(req,res)=> {
    console.info(req.body)
    // deconstructs the body from the post 
    const {title, text } = req.body;
    if(title && text){
        const newnote = {
            title,
            text, 
            //creates unique ID for every note
            id : crypto.randomUUID()
        };
        // updated the db variable with newly created note
        db.push(newnote)
        // reads and updated the updates the JSON file.
        fs.readFile('./db/db.json', "utf8",(err,data) => {
           let mytext = JSON.parse(data)
           mytext.push(newnote)
           
           const noteString = JSON.stringify(mytext);
           fs.writeFile('./db/db.json', noteString,  (err) =>
           err
             ? console.error(err)
             : console.log(
                 `note has been written to JSON file`
               ) );
   
           const response = {
               status : 'success',
               body : newnote,
           };
           res.status(201).json(response);
        });
        
    }
    else {
        res.status(400).json('note does not contain anything.')
    }
});



app.get('/notes', (req,res)=> res.sendFile('./public/notes.html'));
app.listen(PORT, () => 
console.log(`App listening at http;//localhost:${PORT}`))
;
