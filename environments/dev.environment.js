import webpack from 'webpack';
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';

import { envMap } from './defaults/env-map';
import { envSetup } from './defaults/env-setup';
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
