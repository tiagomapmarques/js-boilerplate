import webpack from 'webpack';

import baseEnvironment from './base.environment';

export default {
  ...baseEnvironment,
  devtool: 'cheap-module-source-map',
  plugins: [
    ...baseEnvironment.plugins,
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '\'development\'',
      },
    }),
  ],
};
