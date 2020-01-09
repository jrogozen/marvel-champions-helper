const isDev = process.env.NODE_ENV !== 'production';

function httpErrorResponse(error) {
  const base = {
    success: false,
    error: error.message,
  };

  if (!isDev) {
    return base;
  }

  const errorProperties = {};

  Object.getOwnPropertyNames(error).forEach((name) => {
    errorProperties[name] = error[name];
  });

  const extended = {
    ...base,
    error: errorProperties,
  };

  // axios error
  if (error.response) {
    extended.response = JSON.stringify(error.response.data);
  }

  return extended;
}

module.exports = httpErrorResponse;
