const express = require('express');
const app = express();
require('dotenv').config()
const router = require('./routes/index')
const connectDB = require('./DB/connection')


const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/', router)

connectDB();

app.listen(port, () => {
    console.log(`Listen on port ${port}`);
})
