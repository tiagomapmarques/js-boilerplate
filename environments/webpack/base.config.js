import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';

import { paths } from './builders/paths';
import { rules } from './builders/rules';
import { modules } from './builders/modules';
import { pageConfig } from './builders/page-config';
import { faviconConfig } from './builders/favicon-config';

export const baseConfig = {
  context: paths.appAbsolute,
  devtool: 'eval',
  entry: modules.entries,
  module: { rules },
  output: {
    path: paths.distAssetsAbsolute,
    filename: modules.output,
    publicPath: '/assets',
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin(modules.chunkOverrides),
    new HtmlWebpackPlugin(pageConfig),
    new FaviconsWebpackPlugin(faviconConfig),
  ],
  resolve: {
    extensions: ['.js', '.scss', '.html'],
    modules: [
      paths.appAbsolute,
      'node_modules',
    ],
  },
};
