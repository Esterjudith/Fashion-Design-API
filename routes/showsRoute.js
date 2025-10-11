const route = require('express').Router()
const showsController = require('../controllers/showsController');

route.get('/', showsController.getAllShows);
route.get('/:id', showsController.getshowById);

route.post('/', showsController.createShows);
route.put('/:id', showsController.updateShow);
route.delete('/:id', showsController.deleteShow);

module.exports = route;