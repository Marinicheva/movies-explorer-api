const { allowedCors, DEFAULT_ALLOWED_METHODS } = require('../utils/constants');

const corsRequest = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;

  const requestHeaders = req.headers['access-control-request-headers'];

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }

  if (method === 'OPTIONS') {
    const allowHeaders = `${requestHeaders}, 'Set-Cookie'`;

    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', allowHeaders);
    return res.end();
  }

  return next();
};

module.exports = corsRequest;
