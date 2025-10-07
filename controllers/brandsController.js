const { Brand } = require('../models/brandsModel');

// Get all brands
const getAllBrands = async (req, res) => {
    // #swagger.tags = ['Brands']
  try {
    const brands = await Brand.find();
    res.status(200).json(brands);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a specific brand by ID
const getBrandById = async (req, res) => {
    // #swagger.tags = ['Brands']
  try {
    const brand = await Brand.findById(req.params.id);
    if (!brand) {
      return res.status(404).json({ success: false, message: 'Brand not found' });
    }
    res.status(200).json(brand);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create a new brand
const createBrand = async (req, res) => {
  /* 
    #swagger.tags = ['Brands']
    #swagger.description = 'Create a new fashion brand'
    #swagger.parameters['body'] = {
      in: 'body',
      required: true,
      description: 'Brand data',
      schema: {
        name: "Balenciaga",
        founder: "Cristóbal Balenciaga",
        foundedYear: 1919,
        headquarters: "Paris, France",
        specialization: "Techwear and avant-garde fashion",
        currentCreativeDirector: "Demna Gvasalia",
        website: "https://www.balenciaga.com",
        notableCollections: ["Digital Dreams"],
        slogan: "Defying convention through design.",
        status: "active"
      }
    }
  */
  try {
    const brand = new Brand(req.body);
    await brand.save();
    res.status(201).json(brand);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update an existing brand by ID
const updateBrand = async (req, res) => {
  /* 
    #swagger.tags = ['Brands']
    #swagger.description = 'Update an existing brand by ID'
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'Brand ID',
      required: true,
      type: 'string'
    }
    #swagger.parameters['body'] = {
      in: 'body',
      required: true,
      description: 'Updated brand data',
      schema: {
        name: "Balenciaga",
        founder: "Cristóbal Balenciaga",
        foundedYear: 1919,
        headquarters: "Paris, France",
        specialization: "Luxury fashion and accessories",
        currentCreativeDirector: "Demna Gvasalia",
        website: "https://www.balenciaga.com",
        notableCollections: ["Digital Dreams"],
        slogan: "Fashion without boundaries.",
        status: "active"
      }
    }
  */
  try {
    const updatedBrand = await Brand.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updatedBrand) {
      return res.status(404).json({ success: false, message: 'Brand not found' });
    }
    res.status(200).json(updatedBrand);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a brand by ID
const deleteBrand = async (req, res) => {
    // #swagger.tags = ['Brands']
  try {
    const deletedBrand = await Brand.findByIdAndDelete(req.params.id);
    if (!deletedBrand) {
      return res.status(404).json({ success: false, message: 'Brand not found' });
    }
    res.status(200).json({ success: true, message: 'Brand deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAllBrands,
  getBrandById,
  createBrand,
  updateBrand,
  deleteBrand
};
