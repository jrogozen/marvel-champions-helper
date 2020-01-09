const appRootDir = require('app-root-dir');
const path = require('path');

const envType = process.env.ENV_TYPE || 'local';

require('dotenv').config({
  path: path.resolve(
    appRootDir.get(),
    'tools',
    'env',
    `${envType}.env`,
  ),
});
