import webpack from 'webpack';
import LiveReloadPlugin from 'webpack-livereload-plugin';

import { environments } from '../environments';
import { variables } from '../environments/variables';
import { baseConfig } from './base.config';

const localConfig = {
  ...baseConfig,
  devtool: 'cheap-module-source-map',
  plugins: [
    ...(baseConfig.plugins || []),
    new webpack.DefinePlugin(variables(environments.local)),
    new LiveReloadPlugin({ appendScriptTag: true }),
  ],
};

export default localConfig;
