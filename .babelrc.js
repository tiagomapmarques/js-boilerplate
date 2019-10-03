
const defaultAlias = {
  // 'components/(.*)': './src/app/components/',
  // '^services$': './src/app/services/index.js',
};

const getPlugins = () => ([
  ['@babel/plugin-proposal-decorators', { legacy: true }],
  ['@babel/plugin-proposal-class-properties', { loose: true }],
  ['babel-plugin-module-resolver', { alias: defaultAlias }],
]);

module.exports = {
  presets: [
    '@babel/preset-env',
    ['@babel/preset-typescript', {
      isTSX: true,
      allExtensions: true,
    }],
  ],
  plugins: getPlugins(),
};
