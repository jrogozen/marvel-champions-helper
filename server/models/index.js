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

  static boolean(val) {
    if (isUndefined(val)) {
      return false;
    }

    if (String.isString(val) && val === 'false') {
      return false;
    }

    if (String.isString(val) && val === 'true') {
      return true;
    }

    return Boolean(val);
  }
}

module.exports = Model;
