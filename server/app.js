const express = require('express');


require('../tools/loadEnv');
require('./utils/log');
const augmentError = require('./utils/augmentError');
const secureRequest = require('./middleware/generic/secureRequest');
const setRequestId = require('./middleware/generic/setRequestId');
const useRequestParsers = require('./middleware/generic/useRequestParsers');
const useHttpLogger = require('./middleware/generic/useHttpLogger');
const useErrorMiddleware = require('./middleware/errors');
const useSwagger = require('./middleware/swagger');
const cardsApi = require('./api/cards');

const app = express();

useRequestParsers(app);
setRequestId(app);
secureRequest(app);
useHttpLogger(app);
useSwagger(app);

app.use('/api/v1/marvel-champions/cards', cardsApi);

// health
app.use('/check', (req, res) => res.send('ok check!'));
app.use('/', (req, res) => res.send('ok!'));

app.use('/error', () => {
  const err = new Error('what!');

  augmentError(err, { x: 123 });

  throw err;
});


useErrorMiddleware(app);

module.exports = app;
