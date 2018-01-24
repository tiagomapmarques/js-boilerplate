import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';
import ExtendedDefinePlugin from 'extended-define-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';

import { environments } from '../';
import { getVariables } from '../variables';
import { rules, page, favicon } from './settings';
import { baseConfig } from './base.config';

export const config = {
  ...baseConfig,
  devtool: false,
  module: { rules: rules.minified },
  plugins: [
    ...(baseConfig.plugins || []),
    new HtmlWebpackPlugin(page.minified),
    new FaviconsWebpackPlugin(favicon.all),
    new ExtendedDefinePlugin(getVariables(environments.prod)),
    new webpack.optimize.UglifyJsPlugin({ comments: false }),
    new CompressionPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
};
