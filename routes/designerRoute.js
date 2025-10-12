const router = require('express').Router();
const designerController = require('../controllers/designerController');
const { isAuthenticated } = require('../midddleware/authenticate');
const { designerRules, validateDesigner } = require('../validation/designerValidation');

router.get('/', designerController.getAllDesigners);
router.get('/:id', designerController.getDesignerById);
router.post('/', isAuthenticated, designerRules, validateDesigner, designerController.createDesigner);
router.put('/:id', isAuthenticated, designerRules, validateDesigner, designerController.updateDesigner);
router.delete('/:id', isAuthenticated, designerController.deleteDesigner);


module.exports = router;