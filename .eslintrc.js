module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    log: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
  },
  plugins: [
    'react',
  ],
  rules: {
    "indent": ["error", 2],
    "prefer-arrow-callback": ["error", { "allowNamedFunctions": true }],
    "no-param-reassign": [0],
    "no-plusplus": [0],
    "react/jsx-filename-extension": [0],
  },
};