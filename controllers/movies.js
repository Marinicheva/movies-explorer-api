const mongoose = require('mongoose');

const Movie = require('../models/movie');

const { ERRORS } = require('../utils/constants');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

const getMovies = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const movies = await Movie.find({ owner: userId });
    res.send(movies);
  } catch (err) {
    next(err);
  }
};

const addMovie = async (req, res, next) => {
  try {
    const createdMovie = await Movie.create({ ...req.body, owner: req.user._id });
    res.send(createdMovie);
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      next(new BadRequestError(ERRORS.badRequest.messageDefault));
    }
    next(err);
  }
};

const removeMovie = async (req, res, next) => {
  try {
    const { movieId } = req.params;

    const movie = await Movie.findById(movieId)
      .orFail(new NotFoundError(ERRORS.notFound.messageMovieId));

    if (movie.owner.toString() !== req.user._id) {
      next(new ForbiddenError(ERRORS.forbidden.message));
    } else {
      const deletedMovie = await Movie.findByIdAndRemove(movieId);
      res.send(deletedMovie);
    }
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) {
      next(new BadRequestError(ERRORS.badRequest.messageMovieId));
    } else {
      next(err);
    }
  }
};

module.exports = { getMovies, addMovie, removeMovie };
