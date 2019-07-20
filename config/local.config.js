import ExtendedDefinePlugin from 'extended-define-webpack-plugin';
// eslint-disable-next-line import/no-extraneous-dependencies
import LiveReloadPlugin from 'webpack-livereload-plugin';

import { environments } from './environments';
import { getVariables } from './runtime';
import { app, rules } from './settings';
import { baseConfig } from './base.config';
import { findPort } from './find-ports';

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
