const mongoose = require('mongoose');

const showSchema = new mongoose.Schema({
    collectionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Collection",
        required: true
    }, 
     location: { 
        type: String, 
        required: true 
    },
    date: { 
        type: Date, 
        required: true 
    },
    venue: { 
        type: String 
    },
    specialGuests: [String]
})

const Show = mongoose.model('Show', showSchema);

module.exports = {Show};