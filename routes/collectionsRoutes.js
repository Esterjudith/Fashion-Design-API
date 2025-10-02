const express = require('express');
const router = express.Router();
const collectionsController = require('../controllers/collectionsController');

// Route to get all collections
router.get('/', collectionsController.getAll);

// Route to get a specific collection by ID
router.get('/:id', collectionsController.getById);

// Route to create a new collection
router.post('/', collectionsController.createCollection);

// Route to update an existing collection by ID
router.put('/:id', collectionsController.updateCollection);

// Route to delete a collection by ID
router.delete('/:id', collectionsController.deleteCollection);

module.exports = router;