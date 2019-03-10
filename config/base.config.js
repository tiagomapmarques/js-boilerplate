import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';
import ManifestJsonWebpackPlugin from 'manifest-json-webpack-plugin';
import { VueLoaderPlugin } from 'vue-loader';
import { sync as glob } from 'glob';
import reduceFlatten from 'reduce-flatten';

import { manifest } from './common/manifest';
import {
  app, favicon, page, paths,
} from './settings';

const entry = app.extensions.logic
  .map((ext) => glob(`${process.cwd()}/src/app/*.${ext}`, { ignore: `${process.cwd()}/src/app/*.spec.${ext}` }))
  .reduce((accumulator, files) => ([
    ...accumulator,
    ...files,
  ]), [])
  .map((file) => file.replace(`${process.cwd()}/src/app/`, ''));

export const baseConfig = {
  context: paths.appAbsolute,
  devtool: 'cheap-module-source-map',
  mode: 'development',
  entry,
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
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [`${paths.distAbsolute}/*`].concat((app.cleanExclusions || [])
        .map((exclusion) => `!${paths.distAbsolute}/${exclusion}`)),
    }),
    new CopyWebpackPlugin(app.externalFiles.map((filesRules) => {
      const parsedRules = typeof filesRules === 'string' ? { from: filesRules } : filesRules;
      return {
        ...parsedRules,
        to: `${paths.distAbsolute}/${parsedRules.to || ''}`,
        ignore: parsedRules.ignore || ['.*'],
      };
    })),
    ...(app.style.extract ? [new MiniCssExtractPlugin({ filename: app.output.style })] : []),
    new HtmlWebpackPlugin(page.pretty),
    new FaviconsWebpackPlugin(favicon.minimum),
    new ManifestJsonWebpackPlugin(manifest.pretty),
  ],
  resolve: {
    extensions: Object.values(app.extensions).reduce(reduceFlatten, []).map((ext) => `.${ext}`),
    modules: [
      paths.appAbsolute,
      'node_modules',
    ],
  },
};
