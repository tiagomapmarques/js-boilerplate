import webpack from 'webpack';
import LiveReloadPlugin from 'webpack-livereload-plugin';

import { envSetup } from './defaults/env-setup';
import { baseEnvironment } from './base.environment';

const localEnvironment = {
  ...baseEnvironment,
  devtool: 'cheap-module-source-map',
  plugins: [
    ...(baseEnvironment.plugins || []),
    new LiveReloadPlugin({ appendScriptTag: true }),
    new webpack.DefinePlugin(envSetup('local')),
  ],
};

export default localEnvironment;
