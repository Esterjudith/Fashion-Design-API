const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    season: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    designer: {
        type: String,
        required: true
    },
    theme: {
        type: String,
        required: true  
    },
    description: {
        type: String,
        required: true
    },
    launchDate: {
        type: Date,
        required: true
    },
    numberOfPieces: {
        type: Number,
        required: true
    },
    status: {
        type: String
    }
});

const Collection = mongoose.model('Collection', collectionSchema);

module.exports = {Collection};
