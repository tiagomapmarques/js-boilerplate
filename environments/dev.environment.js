import webpack from 'webpack';
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';

import { envMap, envSetup } from './defaults/environments';
import { buildFavicon } from './defaults/build-favicon';
import { baseEnvironment } from './base.environment';

const devEnvironment = {
  ...baseEnvironment,
  devtool: 'cheap-module-source-map',
  plugins: [
    ...(baseEnvironment.plugins || []),
    new FaviconsWebpackPlugin(buildFavicon(true)),
    new webpack.DefinePlugin(envSetup(envMap.dev)),
  ],
};

export default devEnvironment;
