const route = require('express').Router()
const showsController = require('../controllers/showsController');
const { isAuthenticated } = require('../midddleware/authenticate');
const { showRules, validateShow } = require('../validation/showValidation');


route.get('/', showsController.getAllShows);
route.get('/:id', showsController.getshowById);

route.post('/', isAuthenticated, showRules, validateShow, showsController.createShows);
route.put('/:id', isAuthenticated, showRules, validateShow, showsController.updateShow);
route.delete('/:id', isAuthenticated, showsController.deleteShow);

module.exports = route;