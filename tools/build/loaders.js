const appRootDir = require('app-root-dir');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const babelLoader = {
  test: /\.js/,
  include: [
    path.resolve(appRootDir.get(), 'client'),
  ],
  use: [
    {
      loader: 'thread-loader',
      options: {
        workers: 4,
        poolRespawn: false,
      },
    },
    {
      loader: 'babel-loader',
      options: {
        babelrc: true,
        root: path.resolve(appRootDir.get()),
      },
    },
  ],
};
const urlLoader = {
  test: /\.woff2?$|\.jpe?g$|\.ttf$|\.eot$|\.png$|^(?!.*\.inline\.svg$).*\.svg$/,
  use: [
    {
      loader: 'file-loader',
      options: {
        name: '[name]-[sha512:hash:base64:7].[ext]',
      },
    },
  ],
};
const cssLoader = {
  test: /\.s?css$/,
  use: [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        hmr: process.env.NOD_ENV !== 'production',
      },
    },
    'css-loader',
    {
      loader: 'postcss-loader',
      options: {
        indent: 'postcss',
        sourcemap: true,
        // eslint-disable-next-line import/no-extraneous-dependencies
        plugins: () => [require('autoprefixer')(), require('cssnano')()],
      },
    },
    'sass-loader',
  ],
};


module.exports = {
  babelLoader,
  cssLoader,
  urlLoader,
};
