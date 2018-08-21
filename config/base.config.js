import CleanWebpackPlugin from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';
import ManifestJsonWebpackPlugin from 'manifest-json-webpack-plugin';

import {
  app,
  favicon,
  manifest,
  page,
  paths,
  rules,
} from './settings';

export const baseConfig = {
  context: paths.appAbsolute,
  devtool: 'cheap-module-source-map',
  mode: 'development',
  entry: app.entryPoints,
  module: { rules: rules.pretty },
  output: {
    path: paths.buildAbsolute,
    filename: app.output.script,
    publicPath: paths.buildRelative.replace(paths.distRelative, ''),
  },
  optimization: {
    minimize: false,
    ...(app.commonChunk && app.commonChunk.name ? {
      runtimeChunk: { name: app.commonChunk.name },
      splitChunks: {
        cacheGroups: { commons: app.commonChunk },
      },
    } : {}),
  },
  plugins: [
    new CleanWebpackPlugin(paths.distRelative, { root: paths.baseAbsolute }),
    new CopyWebpackPlugin(app.externalFiles.map(fileRule => ({
      from: fileRule.filePattern || fileRule,
      to: `${paths.distAbsolute}/${fileRule.destination || ''}`,
      ignore: (fileRule.ignorePatterns || []).concat(['.*']),
    }))),
    new MiniCssExtractPlugin({ filename: app.output.style }),
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
