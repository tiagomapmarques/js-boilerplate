import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';
import ManifestJsonWebpackPlugin from 'manifest-json-webpack-plugin';

import { paths } from '../config';
import { app, favicon, manifest, page, rules } from './settings';

export const baseConfig = {
  context: paths.appAbsolute,
  devtool: 'cheap-module-source-map',
  entry: app.chunks,
  module: { rules: rules.pretty },
  output: {
    path: paths.buildAbsolute,
    filename: app.output,
    publicPath: '/build',
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin(app.commonChunkOptions),
    new HtmlWebpackPlugin(page.pretty),
    new FaviconsWebpackPlugin(favicon.minimum),
    new ManifestJsonWebpackPlugin(manifest.pretty),
  ],
  resolve: {
    extensions: ['.js', '.scss', '.html'],
    modules: [
      paths.appAbsolute,
      'node_modules',
    ],
  },
};
