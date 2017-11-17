import webpack from 'webpack';
import LiveReloadPlugin from 'webpack-livereload-plugin';
import DefineWebpackPlugin from 'define-webpack-plugin';

import { environments } from '../';
import { variables } from '../variables';
import { baseConfig } from './base.config';

const localConfig = {
  ...baseConfig,
  devtool: 'cheap-module-source-map',
  plugins: [
    ...(baseConfig.plugins || []),
    new DefineWebpackPlugin(variables(environments.local)),
    new LiveReloadPlugin({ appendScriptTag: true }),
  ],
};

export default localConfig;
