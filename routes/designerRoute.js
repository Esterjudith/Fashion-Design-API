const router = require('express').Router();
const designerController = require('../controllers/designerController')
const { isAuthenticated } = require('../midddleware/authenticate')

router.get('/', designerController.getAllDesigners);
router.get('/:id', designerController.getDesignerById);
router.post('/', isAuthenticated, designerController.createDesigner);
router.put('/:id', isAuthenticated, designerController.updateDesigner);
router.delete('/:id', isAuthenticated, designerController.deleteDesigner);


module.exports = router;