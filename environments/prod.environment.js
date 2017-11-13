import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';

import { variables } from './defaults/variables';
import { environments } from './defaults/environments';
import { buildRules } from './webpack/build-rules';
import { buildPage } from './webpack/build-page';
import { buildFavicon } from './webpack/build-favicon';
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
    new webpack.DefinePlugin(variables(environments.prod)),
    new webpack.optimize.UglifyJsPlugin({ comments: false }),
    new CompressionPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
};

export default prodEnvironment;
