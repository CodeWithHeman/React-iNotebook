const connectToMongo = require('./db');
const express = require('express');

connectToMongo();
const app = express();
const port=3000;

// GET method route
app.get('/', (req, res) => {
    res.send('GET request to the homepage')
})

app.listen(port,()=>{
    console.log(`Example app listening at http://localhost:${port}`);
});