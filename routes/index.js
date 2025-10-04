const router = require('express').Router();
const indexController = require('../controllers/indexController')

router.use('/', require('./swaggger')); 

router.get('/', indexController.getHome);

router.use('/designer', require('./designerRoute'))

router.use('/collections', require('./collectionsRoutes'));


module.exports = router;