// babel.config.js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }], // Configure jsxImportSource here
      'nativewind/babel'
    ],
    plugins: [],
  };
};