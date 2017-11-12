import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';

import { envMap, envSetup } from './defaults/environments';
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
    new HtmlWebpackPlugin(buildPage(true)),
    new FaviconsWebpackPlugin(buildFavicon(true)),
    new webpack.DefinePlugin(envSetup(envMap.prod)),
    new webpack.optimize.UglifyJsPlugin({ comments: false }),
    new CompressionPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
};

export default prodEnvironment;
