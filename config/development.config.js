import FaviconsWebpackPlugin from 'favicons-webpack-plugin';
import ExtendedDefinePlugin from 'extended-define-webpack-plugin';
import PrerenderSpaPlugin from 'prerender-spa-plugin';
import CriticalCssPlugin from 'critical-css-webpack-plugin';

import { environments } from './environments';
import { getVariables } from './runtime';
import {
  app,
  favicon,
  paths,
  rules,
} from './settings';
import { baseConfig } from './base.config';

const { style, compileExclusions } = app;
const environmentVariables = getVariables(environments.dev);

export const config = {
  ...baseConfig,
  module: {
    rules: rules.getPretty(style.global, style.extract, compileExclusions, environmentVariables),
  },
  plugins: [
    ...(baseConfig.plugins || []),
    new FaviconsWebpackPlugin(favicon.all),
    new ExtendedDefinePlugin(environmentVariables),
    new PrerenderSpaPlugin(app.rendering),
    ...(app.style.extract ? [new CriticalCssPlugin({ base: paths.distAbsolute })] : []),
  ],
  resolve: {
    ...(baseConfig.resolve || []),
    alias: {
      inferno: 'inferno/dist/index.dev.esm.js',
    },
  },
};
