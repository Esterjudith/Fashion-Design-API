const router = require('express').Router();
const indexController = require('../controllers/indexController')

router.get('/', indexController.getHome);

router.use('/designer', require('./designerRoute'))


module.exports = router;