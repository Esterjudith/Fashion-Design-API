const mongoose = require('mongoose');

const designerSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true
    },
    birthYear: {
        type: Number
    }, 
    nationality: {
        type:String
    },
    style: {
        type: String
    },
    famousFor: {
        type: String
    }, 
    activeYears: {
        type: String
    }, 
    website: {
        type: String
    },
    awards: {
        type: [String],
        default: []
    }
})

const Designer = mongoose.model('Designer', designerSchema);

module.exports = {Designer};