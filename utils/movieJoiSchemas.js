const { Joi } = require('celebrate');

const { URL_REGEXP } = require('./constants');

const addMovieJoiSchema = {
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(URL_REGEXP),
    trailerLink: Joi.string().required().regex(URL_REGEXP),
    thumbnail: Joi.string().required().regex(URL_REGEXP),
    movieId: Joi.string().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
};

const removeMovieJoiSchema = {
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex(),
  }),
};

module.exports = { addMovieJoiSchema, removeMovieJoiSchema };
