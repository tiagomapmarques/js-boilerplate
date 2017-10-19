import webpack from 'webpack';
import LiveReloadPlugin from 'webpack-livereload-plugin';

import baseEnvironment from './base.environment';

export default {
  ...baseEnvironment,
  devtool: 'cheap-module-source-map',
  plugins: [
    ...baseEnvironment.plugins,
    new LiveReloadPlugin({ appendScriptTag: true }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '\'local\'',
      },
    }),
  ],
};
