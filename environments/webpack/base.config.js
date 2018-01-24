import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';

import { app, paths, rules, page, favicon } from './settings';

export const baseConfig = {
  context: paths.appAbsolute,
  devtool: 'eval',
  entry: app.entries,
  module: { rules: rules.pretty },
  output: {
    path: paths.buildAbsolute,
    filename: app.output,
    publicPath: '/build',
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin(app.chunkOverrides),
    new HtmlWebpackPlugin(page.pretty),
    new FaviconsWebpackPlugin(favicon.minimum),
  ],
  resolve: {
    extensions: ['.js', '.scss', '.html'],
    modules: [
      paths.appAbsolute,
      'node_modules',
    ],
  },
};
