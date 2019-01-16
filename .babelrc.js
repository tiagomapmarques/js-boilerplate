
const defaultAlias = {
  components: './src/app/components',
  '^services$': './src/app/services/index.js',
};

const getAliasPlugin = (additionalAlias = {}) => ([
  'babel-plugin-module-resolver',
  {
    alias: {
      ...defaultAlias,
      ...additionalAlias,
    },
  },
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
  plugins: [
    '@babel/plugin-proposal-class-properties',
    getAliasPlugin(),
  ],
  env: {
    test: {
      plugins: [
        getAliasPlugin({ '^testing$': './src/testing/index.js' }),
      ],
    },
  },
};
