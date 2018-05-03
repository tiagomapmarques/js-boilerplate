import HtmlWebpackPlugin from 'html-webpack-plugin';
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';
import ManifestJsonWebpackPlugin from 'manifest-json-webpack-plugin';

import { app, favicon, manifest, page, paths, rules } from './settings';

export const baseConfig = {
  context: paths.appAbsolute,
  devtool: 'cheap-module-source-map',
  mode: 'development',
  entry: app.entryPoints,
  module: { rules: rules.pretty },
  output: {
    path: paths.buildAbsolute,
    filename: app.output,
    publicPath: '/build',
  },
  optimization: {
    minimize: false,
    ...(app.commonChunk && app.commonChunk.name ? {
      runtimeChunk: {
        name: app.commonChunk.name,
      },
      splitChunks: {
        cacheGroups: {
          commons: app.commonChunk,
        },
      },
    } : {}),
  },
  plugins: [
    new HtmlWebpackPlugin(page.pretty),
    new FaviconsWebpackPlugin(favicon.minimum),
    new ManifestJsonWebpackPlugin(manifest.pretty),
  ],
  resolve: {
    extensions: ['.js', '.scss'],
    modules: [
      paths.appAbsolute,
      'node_modules',
    ],
  },
};
