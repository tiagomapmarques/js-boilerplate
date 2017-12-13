import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';
import ExtendedDefinePlugin from 'extended-define-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';

import { environments } from '../';
import { getVariables } from '../variables';
import { rulesMinified as rules, pageConfigMinified, faviconConfigAll } from './builders';
import { baseConfig } from './base.config';

export const prodConfig = {
  ...baseConfig,
  devtool: false,
  module: { rules },
  plugins: [
    ...(baseConfig.plugins || []),
    new HtmlWebpackPlugin(pageConfigMinified),
    new FaviconsWebpackPlugin(faviconConfigAll),
    new ExtendedDefinePlugin(getVariables(environments.prod)),
    new webpack.optimize.UglifyJsPlugin({ comments: false }),
    new CompressionPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
};
