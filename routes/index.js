const router = require('express').Router();
const indexController = require('../controllers/indexController')
const collectionsController = require('../controllers/collectionsController');

router.get('/', indexController.getHome);

router.use('/collections', collectionsController);


module.exports = router;