// Rutas de usuario
const express = require('express');
const router = express.Router();
const controller = require('../controllers/movies');

router.get('/', controller.getMovies);
router.post('/', controller.createMovie);

router.get('/:id', controller.getMovie)
router.put('/:id', controller.updateMovie)
router.delete('/:id', controller.deleteMovie)

module.exports = router;
