const express = require('express');
const router = express.Router();
const brandsController = require('../controllers/brandsController');
const { isAuthenticated } = require('../midddleware/authenticate')

// Route to get all brands
router.get('/', brandsController.getAllBrands);

// Route to get a specific brand by ID
router.get('/:id', brandsController.getBrandById);

// Route to create a new brand
router.post('/', isAuthenticated, brandsController.createBrand);

// Route to update an existing brand by ID
router.put('/:id', isAuthenticated, brandsController.updateBrand);

// Route to delete a brand by ID
router.delete('/:id', isAuthenticated, brandsController.deleteBrand);

module.exports = router;
