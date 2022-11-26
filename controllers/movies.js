const mongoose = require('mongoose');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');

const Movie = require('../models/movie');

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
    const movie = {
      country: req.body.country,
      director: req.body.director,
      duration: req.body.duration,
      year: req.body.year,
      description: req.body.description,
      image: req.body.image,
      trailerLink: req.body.trailerLink,
      nameRU: req.body.nameRU,
      nameEN: req.body.nameEN,
      thumbnail: req.body.thumbnail,
      movieId: req.body.movieId,
    };
    const createdMovie = await Movie.create({ ...movie, owner: req.user._id });
    res.send(createdMovie);
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      const errorField = err.message.split(': ').splice(1, 1).join('');
      next(new BadRequestError(`Данные в поле ${errorField} не переданы или переданы в некорректном формате`));
    }
    next(err);
  }
};

const removeMovie = async (req, res, next) => {
  try {
    const { movieId } = req.params;

    const movie = await Movie.findById(movieId)
      .orFail(new NotFoundError('Фильм с таким id не найден'));

    if (movie.owner.toString() !== req.user._id) {
      next(new ConflictError('У данного пользователя нет прав на удаление данного фильма'));
    }

    const deletedMovie = await Movie.findByIdAndRemove(movieId);
    res.send(deletedMovie);
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) {
      next(new BadRequestError('Указан некорректный id картчоки'));
    } else {
      next(err);
    }
  }
};

module.exports = { getMovies, addMovie, removeMovie };
