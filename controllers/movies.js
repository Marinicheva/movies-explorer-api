const Movie = require('../models/movie');

const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find({});
    res.send(movies);
  } catch (err) {
    console.log(err);
    res.send(err.code, err.message);
  }
};

const addMovie = async (req, res) => {
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
    console.log(err);
    res.send(err.code, err.message);
  }
};

const removeMovie = async (req, res) => {
  try {
    const { movieId } = req.params;

    const movie = await Movie.findById(movieId)
      .orFail(new Error('Фильм с таким id не найден'));

    if (movie.owner.toString() !== req.user._id) {
      throw new Error('Нет прав на удаление фильма');
    }

    const deletedMovie = await Movie.findByIdAndRemove(movieId);
    res.send(deletedMovie);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

module.exports = { getMovies, addMovie, removeMovie };
