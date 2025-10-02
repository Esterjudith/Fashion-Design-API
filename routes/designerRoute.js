const router = require('express').Router();
const designerController = require('../controllers/designerController')

router.get('/', designerController.getAllDesigners);
router.post('/', designerController.createDesigner);


module.exports = router;