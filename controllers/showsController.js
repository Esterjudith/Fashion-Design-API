const { Show } = require('../models/showsModel');
const { Collection }  = require('../models/collectionsModel');

const getAllShows = async(req, res) => {
    // #swagger.tags = ['Shows']
    try {
        const shows = await Show.find();
        res.status(200).json(shows);
    } catch(error) {
        res.status(500).json({message: error.message});
    }
}

const createShows = async(req, res) => {
/**
 * #swagger.tags = ['Shows']
 * #swagger.description = 'Create a new show'
 * #swagger.parameters['body'] = {
 *   in: 'body',
 *   description: 'Show data',
 *   required: true,
 *   schema: {
 *     $collectionId: "collectionId goes here",
 *     $location: "location address goes here",
 *     $date: "date goes here (YYYY-MM-DD)",
 *     $venue: "venue name goes here",
 *     $specialGuests: ["guest name 1", "guest name 2"]
 *   }
 * }
 */
    try {
        const { collectionId, location, date, venue, specialGuests } = req.body;

        //does collection exist?
        const collection = await Collection.findById(collectionId);
        if(!collection) {
            return res.status(400).json({message: "Collection not found"});
        }
        const show = new Show(req.body);
        await show.save();
        res.status(201).json(show);
    } catch(error) {
        res.status(500).json({message: error.message});
    }
}

const getshowById = async (req, res) => {
    // #swagger.tags = ['Shows']
    const { id } = req.params;

    try {
        const show = await Show.findById(id).populate("collectionId")
        show ? res.status(200).json(show) : res.status(400).json({ message: "Show not found"});
        
    } catch(error) {
        res.status(500).json({message: error.message})
    }
}

const updateShow = async(req, res) => {
    /**
 * #swagger.tags = ['Shows']
 * #swagger.description = 'Create a new show'
 * #swagger.parameters['body'] = {
 *   in: 'body',
 *   description: 'Show data',
 *   required: true,
 *   schema: {
 *     $collectionId: "collectionId goes here",
 *     $location: "location address goes here",
 *     $date: "date goes here (YYYY-MM-DD)",
 *     $venue: "venue name goes here",
 *     $specialGuests: ["guest name 1", "guest name 2"]
 *   }
 * }
 */
    const { id } = req.params;
    try {
        const show = await Show.findByIdAndUpdate(id, req.body, {
            new:true,
            runValidators: true 
        });
        show ? res.status(200).json({ message : 'Show successfully updated'}) : res.status(404).json({ message: "No Show found by that ID"});
    }catch(error) {
        res.status(500).json({ message: error.message});
    }
}

const deleteShow = async (req, res) => {
    // #swagger.tags = ['Shows']
    const { id } = req.params;
    try {
        const show = await Show.findByIdAndDelete(id);
        if(!show) {
            res.status(404).json({message: "No show found with this id"});
        }else {
            res.status(200).json({ message: "Show deleted successfully" });
        }
    }catch(error) {
        res.status(500).json({ message: error.message});
    }
}

module.exports = {getAllShows, createShows, getshowById, updateShow, deleteShow};    