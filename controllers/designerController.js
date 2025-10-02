const { Designer } = require('../models/designersModel');

const getAllDesigners = async (req, res) => {
    try {
        const designers = await  Designer.find();
        res.status(200).json(designers);
    } catch(error) {
        res.status(500).json({message: error.message })
    }
}

const createDesigner = async (req, res) => {
    try {
        const designer = new Designer(req.body);
        await designer.save();
        res.status(201).json(designer);
    } catch(error) {
        res.status(500).json({message: error.message})
    }
}

module.exports = { getAllDesigners, createDesigner };