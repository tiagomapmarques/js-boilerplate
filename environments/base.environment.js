import webpack from 'webpack';

import paths from './paths';
import buildRules from './buildRules';

const entry = 'index.js';
const output = '[name].js';

export default {
  context: paths.appAbsolute,
  devtool: 'eval',
  entry: {
    app: `./${entry}`,
    vendor: [
      // Base libraries
      'vue', 'vue-router', 'vuex', 'vuex-automap',
      // Polyfills
      'babel-polyfill', 'whatwg-fetch'
    ],
  },
  module: {
    rules: buildRules(paths.appAbsolute),
  },
  output: {
    path: paths.distAbsolute,
    filename: output,
    publicPath: '/',
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
    }),
  ],
  resolve: {
    alias: {
      config: `${paths.appAbsolute}/config/index.js`,
      containers: `${paths.appAbsolute}/containers/`,
      services: `${paths.appAbsolute}/services/`,
      states: `${paths.appAbsolute}/states/index.js`,
      environment: `${paths.baseAbsolute}/environments/index.js`,
    },
    extensions: ['.vue', '.js', '.scss', '.html'],
    modules: [
      paths.appAbsolute,
      'node_modules',
    ],
  },
};
