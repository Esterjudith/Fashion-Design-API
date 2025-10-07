const express = require('express');
const router = express.Router();
const brandsController = require('../controllers/brandsController');

// Route to get all brands
router.get('/', brandsController.getAllBrands);

// Route to get a specific brand by ID
router.get('/:id', brandsController.getBrandById);

// Route to create a new brand
router.post('/', brandsController.createBrand);

// Route to update an existing brand by ID
router.put('/:id', brandsController.updateBrand);

// Route to delete a brand by ID
router.delete('/:id', brandsController.deleteBrand);

module.exports = router;
