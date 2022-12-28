const URL_REGEXP = /https?:\/\/(w{3}.)?(\S)*\.\w{2,3}((\/\w+)+(\/\S+)+)?/;
const MONGO_BASE_URL = 'mongodb://localhost:27017/moviesdb';
const DEV_SECRET_TOKEN = 'dev-secret';
const ERRORS = {
  badRequest: {
    code: 400,
    messageDefault: 'Переданные данные некорректные или отсутствуют',
    messageMovieId: 'Указан некорректный id фильма',
    messageUserId: 'Указан некорректный id пользователя',
  },
  unauthorized: {
    code: 401,
    messageDefault: 'Необходима авторизация',
    messageIncorrectData: 'Проверьте правильность вводимых email и пароля',
  },
  forbidden: {
    code: 403,
    message: 'У текущего пользователя нет прав на удаление данного фильма',
  },
  notFound: {
    code: 404,
    messageDefault: 'Запрашиваемый ресурс не найден',
    messageMovieId: 'Фильм с таким id не найден',
    messageUserID: 'Пользователь с таким id не найден',
  },
  conflict: {
    code: 409,
    message: 'Пользователь с таким email уже существует',
  },
  default: {
    code: 500,
    message: 'На сервера произошла ошибка',
  },
};

const allowedCors = [
  'https://movies.marinich.nomoredomains.club',
  'http://movies.marinich.nomoredomains.club',
  'http://localhost:3000',
  'https://localhost:3000',
];

const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

module.exports = {
  URL_REGEXP, MONGO_BASE_URL, DEV_SECRET_TOKEN, ERRORS, allowedCors, DEFAULT_ALLOWED_METHODS,
};
