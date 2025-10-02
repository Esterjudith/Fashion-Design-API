const mongoose = require('mongoose');

const designerSchema = new mongoose.Schema({
    name: {
        type:String,
        require: true
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

const Designer = new mongoose.model('Designer', designerSchema);

module.exports = {Designer};