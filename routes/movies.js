const router = require('express').Router();
const { celebrate } = require('celebrate');

const { addMovieJoiSchema, removeMovieJoiSchema } = require('../utils/movieJoiSchemas');
const { getMovies, addMovie, removeMovie } = require('../controllers/movies');

router.get('/', getMovies);
router.post('/', celebrate(addMovieJoiSchema), addMovie);
router.delete('/:movieId', celebrate(removeMovieJoiSchema), removeMovie);

module.exports = router;
