
const defaultAlias = {
  components: './src/app/components',
  '^services$': './src/app/services/index.js',
};

const getPlugins = (additionalAlias = {}) => ([
  ['@babel/plugin-proposal-decorators', { 'legacy': true }],
  ['@babel/plugin-proposal-class-properties'],
  ['babel-plugin-module-resolver', { alias: {
    ...defaultAlias,
    ...additionalAlias,
  }}],
]);

module.exports = {
  presets: [
    ['@babel/preset-env', {
      targets: {
        browsers: [
          'defaults',
          'ie >= 9',
        ],
      },
      useBuiltIns: 'entry',
    }],
    ['@babel/preset-typescript', {
      isTSX: true,
      allExtensions: true,
    }],
  ],
  plugins: getPlugins(),
  env: {
    test: {
      plugins: getPlugins({ '^testing$': './src/testing/index.js' }),
    },
  },
};
