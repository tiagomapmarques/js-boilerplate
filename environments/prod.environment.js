import webpack from 'webpack';

import paths from './paths';
import buildRules from './buildRules';

import baseEnvironment from './base.environment';

export default {
  ...baseEnvironment,
  devtool: '',
  module: {
    rules: buildRules(paths.appAbsolute, true),
  },
  plugins: [
    ...baseEnvironment.plugins,
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '\'production\'',
      }
    }),
    new webpack.optimize.UglifyJsPlugin({ comments: false }),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
};
