const URL_REGEXP = /https?:\/\/(w{3}.)?(\S)*\.\w{2,3}((\/\w+)+(\/\S+)+)?/;
const MONGO_BASE_URL = 'mongodb://localhost:27017/moviesdb';
const DEV_SECRET_TOKEN = 'dev-secret';

module.exports = { URL_REGEXP, MONGO_BASE_URL, DEV_SECRET_TOKEN };
