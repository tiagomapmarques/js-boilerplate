import * as webpack from 'webpack';
import * as LiveReloadPlugin from 'webpack-livereload-plugin';

import { envSetup } from './defaults/env-setup';
import { baseEnvironment } from './base.environment';

const localEnvironment: webpack.Configuration = {
  ...baseEnvironment,
  devtool: 'cheap-module-source-map',
  plugins: [
    ...(baseEnvironment.plugins || []),
    new LiveReloadPlugin({ appendScriptTag: true }),
    new webpack.DefinePlugin(envSetup('local')),
  ],
};

export default localEnvironment; // tslint:disable-line:no-default-export
