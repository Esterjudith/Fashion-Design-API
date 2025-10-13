const { Collection } = require('../models/collectionsModel');

// Get all collections in the database
const getAllCollections = async (req, res) => {
  // #swagger.tags = ['Collections']
    try {
        const collections = await Collection.find();      
        res.status(200).json(collections);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a specific collection by ID
const getCollectionById = async (req, res) => {
    // #swagger.tags = ['Collections']
    try {
        const collection = await Collection.findById(req.params.id);
        if (!collection) {
          return res.status(404).json({ success: false, message: 'No Collection found by that ID' });
        }
        // Format launchDate to 'YYYY-MM-DD'
        const obj = collection.toObject();
        if (obj.launchDate) {
            obj.launchDate = new Date(obj.launchDate).toISOString().split('T')[0];
        }
        // delete __v fields
        delete obj.__v;
        res.status(200).json(obj);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


// Create a new collection  
const createCollection = async (req, res) => {
   /* 
    #swagger.tags = ['Collections']
    #swagger.description = 'Create a new fashion collection'
    #swagger.parameters['body'] = {
      in: 'body',
      required: true,
      description: 'Collection data',
      schema: {
        title: "Eternal Elegance",
        season: "Spring",
        year: 2025,
        designer: "Alexander McQueen",
        theme: "Minimalist luxury",
        description: "A refined collection showcasing clean silhouettes and pastel tones.",
        launchDate: "2025-03-15",
        numberOfPieces: 24,
        status: "upcoming"
      }
    }
  */
    try {
        const collection = new Collection(req.body);
        await collection.save();        
        res.status(201).json(collection);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an existing collection by ID
const updateCollection = async (req, res) => {
    /* 
    #swagger.tags = ['Collections']
    #swagger.description = 'Update an existing fashion collection'
    #swagger.parameters['body'] = {
      in: 'body',
      required: true,
      description: 'Updated collection data',
      schema: {
        title: "Urban Edge",
        season: "Summer",
        year: 2025,
        designer: "Virgil Abloh",
        theme: "Streetwear fusion",
        description: "High-fashion tailoring mixed with street-inspired looks.",
        launchDate: "2025-06-10",
        numberOfPieces: 30,
        status: "upcoming"
      }
    }
  */
  const { id } = req.params;
    try {
      const collection = await Collection.findByIdAndUpdate(id, req.body, {
        new: true, 
        runValidators: true
      });
              
      if (!collection) {
          return res.status(404).json({ success: false, message: 'No Collection found by that ID' });
        }
    
      res.status(200).json({message: 'Collection succesfully updated'});
    } catch (error) {
        res.status(500).json({message: error.message });
    }
};

// Delete a collection by ID
const deleteCollection = async (req, res) => {
    // #swagger.tags = ['Collections']
    try {
        const deletedCollection = await Collection.findByIdAndDelete(req.params.id);
        if (!deletedCollection) {
          return res.status(404).json({ message: 'No Collection found by that ID' });
        }
        res.status(200).json({ success: true, message: 'Collection deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
  getAllCollections,
  getCollectionById,
  createCollection,
  updateCollection,
  deleteCollection
};
    