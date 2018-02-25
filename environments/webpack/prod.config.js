import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';
import ManifestJsonWebpackPlugin from 'manifest-json-webpack-plugin';
import ExtendedDefinePlugin from 'extended-define-webpack-plugin';
import PrerenderSpaPlugin from 'prerender-spa-plugin';

import { environments } from '../';
import { paths } from '../config';
import { getVariables } from '../variables';
import { app, favicon, manifest, page, rules } from './settings';
import { baseConfig } from './base.config';

export const config = {
  ...baseConfig,
  devtool: false,
  module: { rules: rules.minified },
  plugins: [
    ...(baseConfig.plugins || []),
    new HtmlWebpackPlugin(page.minified),
    new FaviconsWebpackPlugin(favicon.all),
    new ManifestJsonWebpackPlugin(manifest.minified),
    new ExtendedDefinePlugin(getVariables(environments.prod)),
    new PrerenderSpaPlugin(paths.distAbsolute, app.routes),
    new webpack.optimize.UglifyJsPlugin({ comments: false }),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
};
