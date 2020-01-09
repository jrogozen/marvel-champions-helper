const httpErrorResponse = require('./httpErrorResponse');
const logError = require('../../utils/logError');

const logger = log.child({ name: 'middleware' });

// eslint-disable-next-line no-unused-vars
function handleError(error, req, res, next) {
  logError({
    error,
    logger,
    message: 'handling error in express middleware chain',
  });

  const toSend = httpErrorResponse(error);

  res.status(500).send(toSend);
}

function useErrorMiddleware(app) {
  app.use('*',
    handleError);
}

module.exports = useErrorMiddleware;
