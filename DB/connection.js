const mongoose = require('mongoose');
require('dotenv').config();
const URI = process.env.DATABASE_URI;

const connectDB = async() => {
    await mongoose.connect(URI);
    console.log('db connected...')
}

module.exports = connectDB;