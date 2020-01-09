const PrettyError = require('pretty-error');

const isDev = process.env.NODE_ENV !== 'production';
const pe = new PrettyError();

pe.skipNodeFiles();
pe.skipPackage('express');

function logError({
  error,
  logger,
  message,
  additional = {},
}) {
  if (isDev) {
    // eslint-disable-next-line no-console
    console.log(`\n${pe.render(error)}`);
  }

  logger.error({
    error: {
      name: error.name,
      stack: error.stack,
      message: error.message,
      code: error.code,
      data: error.data,
    },
    ...additional,
  }, message);
}

module.exports = logError;
