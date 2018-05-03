import { NoEmitOnErrorsPlugin } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';
import ManifestJsonWebpackPlugin from 'manifest-json-webpack-plugin';
import ExtendedDefinePlugin from 'extended-define-webpack-plugin';
import PrerenderSpaPlugin from 'prerender-spa-plugin';
import CriticalCssPlugin from 'critical-css-webpack-plugin';

import { environments } from './environments';
import { getVariables } from './runtime';
import { app, favicon, manifest, page, paths, rules } from './settings';
import { baseConfig } from './base.config';

export const config = {
  ...baseConfig,
  devtool: false,
  mode: 'production',
  module: { rules: rules.minified },
  optimization: {
    ...baseConfig.optimization,
    minimize: true,
  },
  plugins: [
    ...(baseConfig.plugins || []),
    new HtmlWebpackPlugin(page.minified),
    new FaviconsWebpackPlugin(favicon.all),
    new ManifestJsonWebpackPlugin(manifest.minified),
    new ExtendedDefinePlugin(getVariables(environments.prod)),
    new PrerenderSpaPlugin(app.rendering.staticDir, app.rendering.routes),
    new CriticalCssPlugin({
      base: paths.distAbsolute,
    }),
    new NoEmitOnErrorsPlugin(),
  ],
};
