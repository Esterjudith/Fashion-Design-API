const route = require('express').Router()
const showsController = require('../controllers/showsController');
const { isAuthenticated } = require('../midddleware/authenticate');


route.get('/', showsController.getAllShows);
route.get('/:id', showsController.getshowById);

route.post('/', isAuthenticated, showsController.createShows);
route.put('/:id', isAuthenticated, showsController.updateShow);
route.delete('/:id', isAuthenticated, showsController.deleteShow);

module.exports = route;