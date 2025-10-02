const mongodb = require('../connect/db');
const { ObjectId } = require('mongodb').ObjectId;

// Get all collections in the database
const getAllCollections = async (req, res) => {
  // #swagger.tags = ['Collections']
  try {
    const result = await mongodb.getDatabase().db().collection('collections').find();
    const collections = await result.toArray();
    res.status(200).json(collections);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get a specific collection by ID
const getCollectionById = async (req, res) => {
  // #swagger.tags = ['Collections']
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ success: false, message: 'Invalid collection ID' });
        }
        const collectionId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('collections').findOne({ _id: collectionId });
        const collections = await result.toArray();
        res.status(200).json(collections[0]);
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Create a new collection  
const createCollection = async (req, res) => {
  // #swagger.tags = ['Collections']
    try {
        console.log('Request body:', req.body);
        const collection = {
            name: req.body.name,
            description: req.body.description,
            createdAt: new Date()
        };

        const response = await mongodb.getDatabase().db().collection('collections').insertOne(collection);
        if (response.acknowledged) {
            res.status(201).json({ success: true, message: 'Collection created successfully', id: response.insertedId });
        } else {
            res.status(500).json({ success: false, message: 'Failed to create collection' });
        }
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Update an existing collection by ID
const updateCollection = async (req, res) => {
    // #swagger.tags = ['Collections']
    try {
        console.log('Request body:', req.body);
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ success: false, message: 'Invalid collection ID' });
        }
        const collectionId = new ObjectId(req.params.id);
        const collection = {
            name: req.body.name,
            description: req.body.description,
            updatedAt: new Date()
        };

        const response = await mongodb.getDatabase().db().collection('collections').replaceOne({ _id: collectionId }, collection);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json({ success: false, message: 'Failed to update collection' });
        }
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Delete a collection by ID
const deleteCollection = async (req, res) => {
    // #swagger.tags = ['Collections']
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ success: false, message: 'Invalid collection ID' });
        }
        const collectionId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection('collections').deleteOne({ _id: collectionId });
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json({ success: false, message: 'Failed to delete collection' });
        }
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

module.exports = {
  getAllCollections,
  getCollectionById,
  createCollection,
  updateCollection,
  deleteCollection
};
    