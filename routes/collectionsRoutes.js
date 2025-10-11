const express = require('express');
const router = express.Router();
const collectionsController = require('../controllers/collectionsController');
const { isAuthenticated } = require('../midddleware/authenticate')

// Route to get all collections
router.get('/', collectionsController.getAllCollections);

// Route to get a specific collection by ID
router.get('/:id', collectionsController.getCollectionById);

// Route to create a new collection
router.post('/', isAuthenticated, collectionsController.createCollection);

// Route to update an existing collection by ID
router.put('/:id', isAuthenticated, collectionsController.updateCollection);

// Route to delete a collection by ID
router.delete('/:id', isAuthenticated, collectionsController.deleteCollection);

module.exports = router;