import CleanWebpackPlugin from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';
import ManifestJsonWebpackPlugin from 'manifest-json-webpack-plugin';
import { VueLoaderPlugin } from 'vue-loader';

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
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(paths.distRelative, { root: paths.baseAbsolute, verbose: false }),
    new CopyWebpackPlugin(app.externalFiles.map((filesRules) => {
      const parsedRules = typeof filesRules === 'string' ? { from: filesRules } : filesRules;
      return {
        ...parsedRules,
        to: `${paths.distAbsolute}/${parsedRules.to || ''}`,
        ignore: parsedRules.ignore || ['.*'],
      };
    })),
    new MiniCssExtractPlugin({ filename: app.output.style }),
    new HtmlWebpackPlugin(page.pretty),
    new FaviconsWebpackPlugin(favicon.minimum),
    new ManifestJsonWebpackPlugin(manifest.pretty),
  ],
  resolve: {
    extensions: ['.js', '.vue', '.scss'],
    alias: {
      bourbon: `${paths.baseAbsolute}/node_modules/bourbon/core/_bourbon.scss`,
      neat: `${paths.baseAbsolute}/node_modules/bourbon-neat/core/_neat.scss`,
      'design-system': `${paths.baseAbsolute}/src/design-system/index.scss`,
    },
    modules: [
      paths.appAbsolute,
      'node_modules',
    ],
  },
};
