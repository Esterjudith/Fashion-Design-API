const express = require('express');
const app = express();
require('dotenv').config()
const router = require('./routes/index')


const port = process.env.PORT || 3000;

app.use('/', router)

app.listen(port, () => {
    console.log(`Listen on port ${port}`);
})