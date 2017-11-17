import ExtendedDefinePlugin from 'extended-define-webpack-plugin';
import LiveReloadPlugin from 'webpack-livereload-plugin';

import { environments } from '../';
import { variables } from '../variables';
import { baseConfig } from './base.config';

const localConfig = {
  ...baseConfig,
  devtool: 'cheap-module-source-map',
  plugins: [
    ...(baseConfig.plugins || []),
    new ExtendedDefinePlugin(variables(environments.local)),
    new LiveReloadPlugin({ appendScriptTag: true }),
  ],
};

export default localConfig;
