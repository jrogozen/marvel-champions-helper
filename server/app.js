/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */
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
const marvelCardsApi = require('./api/cards/marvel');

const app = express();
const compileClient = process.env !== 'production';

useRequestParsers(app);
setRequestId(app);
secureRequest(app);
useHttpLogger(app);
useSwagger(app);

if (compileClient) {
  const config = require('../tools/build/webpack.config.js');
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');

  const compiler = webpack(config);

  app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    logLevel: 'warn',
  }));
  app.use(webpackHotMiddleware(compiler));
}

app.use('/api/v1/marvel-champions/cards', marvelCardsApi);

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
