const { hot } = require('react-hot-loader/root');
const React = require('react');

require('./app.scss');

const App = () => <div>example app component</div>;

module.exports = hot(App);
