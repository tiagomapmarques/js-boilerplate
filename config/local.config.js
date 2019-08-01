import ExtendedDefinePlugin from 'extended-define-webpack-plugin';
// eslint-disable-next-line import/no-extraneous-dependencies
import LiveReloadPlugin from 'webpack-livereload-plugin';

import { rules } from './common/rules';
import { findPort } from './common/find-ports';
import { getVariables } from './runtime';
import { app } from './settings';
import { environments } from './environments';
import { baseConfig } from './base.config';

const { style, compileExclusions } = app;
const environmentVariables = getVariables(environments.local);

export const config = {
  ...baseConfig,
  module: {
    rules: rules.getPretty(style.global, style.extract, compileExclusions, environmentVariables),
  },
  plugins: [
    ...(baseConfig.plugins || []),
    new ExtendedDefinePlugin(environmentVariables),
    new LiveReloadPlugin({
      appendScriptTag: true,
      port: findPort(35729),
    }),
  ],
};
