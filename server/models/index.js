const isUndefined = require('lodash/isUndefined');

class Model {
  static string(val) {
    if (!val) {
      return '';
    }

    return String(val);
  }

  static number(val) {
    if (isUndefined(val)) {
      return null;
    }

    return Number(val);
  }
}

module.exports = Model;
