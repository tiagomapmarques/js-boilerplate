import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';

import { paths } from './defaults/paths';
import { modules } from './defaults/modules';
import { buildRules } from './defaults/build-rules';
import { buildPage } from './defaults/build-page';
import { buildFavicon } from './defaults/build-favicon';

export const baseEnvironment = {
  context: paths.appAbsolute,
  devtool: 'eval',
  entry: modules.entries,
  module: {
    rules: buildRules(),
  },
  output: {
    path: paths.distAssetsAbsolute,
    filename: modules.output,
    publicPath: '/assets',
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin(modules.chunkOverrides),
    new HtmlWebpackPlugin(buildPage()),
    new FaviconsWebpackPlugin(buildFavicon()),
  ],
  resolve: {
    extensions: ['.js', '.scss', '.html'],
    modules: [
      paths.appAbsolute,
      'node_modules',
    ],
  },
};
