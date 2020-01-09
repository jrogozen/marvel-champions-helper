function augmentError(error, data) {
  error.data = {
    ...error.data,
    ...data,
  };
}

module.exports = augmentError;
