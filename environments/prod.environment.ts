import * as webpack from 'webpack';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as FaviconsWebpackPlugin from 'favicons-webpack-plugin';

import { envSetup } from './defaults/env-setup';
import { buildRules } from './defaults/build-rules';
import { buildPage } from './defaults/build-page';
import { buildFavicon } from './defaults/build-favicon';
import { baseEnvironment } from './base.environment';

const prodEnvironment: webpack.Configuration = {
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

export default prodEnvironment; // tslint:disable-line:no-default-export
