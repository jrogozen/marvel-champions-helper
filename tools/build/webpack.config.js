const appRootDir = require('app-root-dir');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const {
  babelLoader,
  cssLoader,
  urlLoader,
} = require('./loaders');

const isDev = process.env.NODE_ENV !== 'production';

module.exports = {
  mode: isDev ? 'development' : 'production',
  entry: [
    'webpack-hot-middleware/client',
    path.resolve(appRootDir.get(), 'client', 'index.js'),
  ],
  devtool: 'inline-source-map',
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'decktool.app',
      template: path.resolve(appRootDir.get(), 'server/utils/template.html'),
    }),
    new MiniCssExtractPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(appRootDir.get(), 'dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      babelLoader,
      urlLoader,
      cssLoader,
    ],
  },
};
