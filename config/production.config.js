import { NoEmitOnErrorsPlugin } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';
import ManifestJsonWebpackPlugin from 'manifest-json-webpack-plugin';
import ExtendedDefinePlugin from 'extended-define-webpack-plugin';
import PrerenderSpaPlugin from 'prerender-spa-plugin';
import CriticalCssPlugin from 'critical-css-webpack-plugin';

import { manifest } from './common/manifest';
import { rules } from './common/rules';
import { getVariables } from './runtime';
import {
  app, favicon, page, paths,
} from './settings';
import { environments } from './environments';
import { baseConfig } from './base.config';

const { style, compileExclusions } = app;
const environmentVariables = getVariables(environments.prod);

export const config = {
  ...baseConfig,
  devtool: false,
  mode: 'production',
  module: {
    rules: rules.getMinified(style.global, style.extract, compileExclusions, environmentVariables),
  },
  optimization: {
    ...baseConfig.optimization,
    minimize: true,
  },
  plugins: [
    ...(baseConfig.plugins || []),
    new HtmlWebpackPlugin(page.minified),
    new FaviconsWebpackPlugin(favicon.all),
    new ManifestJsonWebpackPlugin(manifest.minified),
    new ExtendedDefinePlugin(environmentVariables),
    new PrerenderSpaPlugin(app.rendering),
    ...(app.style.extract ? [new CriticalCssPlugin({ base: paths.distAbsolute })] : []),
    new NoEmitOnErrorsPlugin(),
  ],
};
