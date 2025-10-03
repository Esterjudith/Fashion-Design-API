const { Designer } = require('../models/designersModel');

const getAllDesigners = async (req, res) => {
    // #swagger.tags = ['Designers']
    try {
        const designers = await  Designer.find();
        res.status(200).json(designers);
    } catch(error) {
        res.status(500).json({message: error.message })
    }
}

const createDesigner = async (req, res) => {
    /* 
    #swagger.tags = ['Designers']
    #swagger.description = 'Create a new fashion designer'
    #swagger.parameters['body'] = {
      in: 'body',
      required: true,
      description: 'Designer data',
      schema: {
        name: "Coco Chanel",
        birthYear: 1883,
        nationality: "French",
        style: "Timeless elegance",
        famousFor: "The little black dress, Chanel No.5",
        activeYears: "1909–1971",
        website: "https://www.chanel.com",
        awards: ["Neiman Marcus Fashion Award (1957)"]
      }
    }
  */
    try {
        const designer = new Designer(req.body);
        await designer.save();
        res.status(201).json(designer);
    } catch(error) {
        res.status(500).json({message: error.message})
    }
}

const getDesignerById = async (req, res) => {
    // #swagger.tags = ['Designers']
    const { id } = req.params;

    try {
        const designer = await Designer.findById(id);     
        designer ? res.status(200).json(designer) :  res.status(404).json({message: 'No Designer found by that ID'});   
    } catch(error) {
        res.status(500).json({message: error.message});
    }
}

const updateDesigner = async (req, res) => {
    /* 
    #swagger.tags = ['Designers']
    #swagger.description = 'Update an existing designer'
    #swagger.parameters['body'] = {
      in: 'body',
      required: true,
      description: 'Updated designer data',
      schema: {
        name: "Giorgio Armani",
        birthYear: 1934,
        nationality: "Italian",
        style: "Luxury menswear",
        famousFor: "Soft-shouldered suits",
        activeYears: "1975–present",
        website: "https://www.armani.com",
        awards: ["CFDA International Award (1983)"]
      }
    }
  */
    const { id } = req.params;
    try {
        const designer = await Designer.findByIdAndUpdate(id, req.body, {
            new: true, 
            runValidators: true
        });
        designer ? res.status(200).json({message: 'Designer successfully updated'}) :  res.status(404).json({message: 'No Designer found by that ID'})           
        }catch(error){
        res.status(500).json({message: error.message});
    }
        
    } 


const deleteDesigner = async (req, res) => {
    // #swagger.tags = ['Designers']
    const { id } = req.params;
    try {
        const designer = await Designer.findByIdAndDelete(id);
        designer ? res.status(200).json({message: 'Designer successfully deleted'}) :  res.status(404).json({message: 'No Designer found by that ID'});           
} catch(error) {
    res.status(500).json({message: error.message});
}
}

module.exports = { getAllDesigners, createDesigner, getDesignerById, updateDesigner, deleteDesigner};