const connectToMongo = require('./db');
const express = require('express');

connectToMongo();
const app = express();
var cors = require('cors') 
const port=5000;

app.use(cors())
app.use(express.json());

//Available Routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))


// GET method route
app.get('/', (req, res) => {
    res.send('GET request to the homepage')
})


app.listen(port,()=>{
    console.log(`iNotebook backend listening at http://localhost:${port}`);
});