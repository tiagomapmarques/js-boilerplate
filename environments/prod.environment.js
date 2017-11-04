import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';

import { envSetup } from './defaults/env-setup';
import { buildRules } from './defaults/build-rules';
import { buildPage } from './defaults/build-page';
import { buildFavicon } from './defaults/build-favicon';
import { baseEnvironment } from './base.environment';

const prodEnvironment = {
  ...baseEnvironment,
  devtool: false,
  module: {
    rules: buildRules(true),
  },
  plugins: [
    ...(baseEnvironment.plugins || []),
    new webpack.DefinePlugin(envSetup('production')),
    new HtmlWebpackPlugin(buildPage(true)),
    new FaviconsWebpackPlugin(buildFavicon(true)),
    new webpack.optimize.UglifyJsPlugin({ comments: false }),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
};

export default prodEnvironment;
