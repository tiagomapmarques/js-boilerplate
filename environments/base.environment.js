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
      // App libraries
      'vue',
      // Support libraries
      'browser-polyfills',
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
    extensions: ['.vue', '.js', '.scss', '.html'],
    modules: [
      paths.appAbsolute,
      'node_modules',
    ],
  },
};
