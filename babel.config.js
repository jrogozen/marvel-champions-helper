module.exports = function babelConfig(api) {
  api.cache(true);

  const presets = [
    ['@babel/preset-env', {
      modules: 'commonjs',
    }],
    '@babel/preset-react',
  ];
  const plugins = [
    'react-hot-loader/babel',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-class-properties',
  ];

  return {
    presets,
    plugins,
  };
};
