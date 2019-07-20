
const defaultAlias = {
  'components/(.*)': './src/app/components/',
  '^services$': './src/app/services/index.js',
};

const testAlias = {
  '^testing$': './src/testing/index.js',
};

const getPlugins = (addTestAlias = false) => ([
  ['@babel/plugin-proposal-decorators', { legacy: true }],
  ['@babel/plugin-proposal-class-properties', { loose: true }],
  ['babel-plugin-module-resolver', { alias: {
    ...defaultAlias,
    ...(!addTestAlias ? {} : testAlias),
  }}],
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
  env: {
    test: {
      plugins: getPlugins(true),
    },
  },
};
