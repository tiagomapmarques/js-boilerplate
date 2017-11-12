import webpack from 'webpack';
import LiveReloadPlugin from 'webpack-livereload-plugin';

import { envMap, envSetup } from './defaults/environments';
import { baseEnvironment } from './base.environment';

const localEnvironment = {
  ...baseEnvironment,
  devtool: 'cheap-module-source-map',
  plugins: [
    ...(baseEnvironment.plugins || []),
    new webpack.DefinePlugin(envSetup(envMap.local)),
    new LiveReloadPlugin({ appendScriptTag: true }),
  ],
};

export default localEnvironment;
