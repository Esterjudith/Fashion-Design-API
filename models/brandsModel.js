const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true, 
        unique: true 
    },
    founder: { 
        type: String, 
        required: true 
    },
    foundedYear: { 
        type: Number, 
        required: true 
    },
    headquarters: { 
        type: String 
    },
    specialization: { 
        type: String 
    },
    currentCreativeDirector: { 
        type: String 
    },
    website: { 
        type: String 
    },
    notableCollections: { 
        type: [String], 
        default: [] 
    },
    slogan: { 
        type: String 
    },
    status: { 
        type: String, 
        enum: ['active', 'inactive', 'acquired'], 
        default: 'active' 
    }
});

const Brand = mongoose.model('Brand', brandSchema);

module.exports = { Brand };
