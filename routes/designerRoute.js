const router = require('express').Router();
const designerController = require('../controllers/designerController')

router.get('/', designerController.getAllDesigners);
router.get('/:id', designerController.getDesignerById);
router.post('/', designerController.createDesigner);
router.put('/:id', designerController.updateDesigner);
router.delete('/:id', designerController.deleteDesigner);


module.exports = router;