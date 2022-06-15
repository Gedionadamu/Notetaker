const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static('public'));

app.get('*', (req, res) => res.sendFile('./public/index.html'));

app.get('/notes', (req,res)=> res.sendFile('./public/notes.html'));

app.listen(PORT, () => 
console.log(`App listening at http;//localhost:${PORT}`))
;
