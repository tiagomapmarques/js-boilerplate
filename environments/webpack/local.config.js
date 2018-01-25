import ExtendedDefinePlugin from 'extended-define-webpack-plugin';
// eslint-disable-next-line import/no-extraneous-dependencies
import LiveReloadPlugin from 'webpack-livereload-plugin';

import { environments } from 'environments';
import { getVariables } from 'environments/variables';

import { baseConfig } from './base.config';

export const config = {
  ...baseConfig,
  plugins: [
    ...(baseConfig.plugins || []),
    new ExtendedDefinePlugin(getVariables(environments.local)),
    new LiveReloadPlugin({ appendScriptTag: true }),
  ],
};
