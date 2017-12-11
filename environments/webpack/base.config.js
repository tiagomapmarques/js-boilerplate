import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';

import { paths, rules, modules, pageConfig, faviconConfig } from './builders';

export const baseConfig = {
  context: paths.appAbsolute,
  devtool: 'eval',
  entry: modules.entries,
  module: { rules },
  output: {
    path: paths.buildAbsolute,
    filename: modules.output,
    publicPath: '/build',
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin(modules.chunkOverrides),
    new HtmlWebpackPlugin(pageConfig),
    new FaviconsWebpackPlugin(faviconConfig),
  ],
  resolve: {
    extensions: ['.vue', '.js', '.scss', '.html'],
    modules: [
      paths.appAbsolute,
      'node_modules',
    ],
  },
};
