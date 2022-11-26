const URL_REGEXP = /https?:\/\/(w{3}.)?(\S)*\.\w{2,3}((\/\w+)+(\/\S+)+)?/;
const MONGO_BASE_URL = 'mongodb://localhost:27017/moviesdb';
const DEV_SECRET_TOKEN = 'dev-secret';
const ERROR_CODES = {
  badRequest: 400,
  unauthorized: 401,
  forbidden: 403,
  notFound: 404,
  conflict: 409,
  default: 500,
};

module.exports = {
  URL_REGEXP, MONGO_BASE_URL, DEV_SECRET_TOKEN, ERROR_CODES,
};
