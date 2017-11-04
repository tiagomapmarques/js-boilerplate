import webpack from 'webpack';
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';

import { envSetup } from './defaults/env-setup';
import { buildFavicon } from './defaults/build-favicon';
import { baseEnvironment } from './base.environment';

const devEnvironment = {
  ...baseEnvironment,
  devtool: 'cheap-module-source-map',
  plugins: [
    ...(baseEnvironment.plugins || []),
    new webpack.DefinePlugin(envSetup('development')),
    new FaviconsWebpackPlugin(buildFavicon(true)),
  ],
};

export default devEnvironment;
