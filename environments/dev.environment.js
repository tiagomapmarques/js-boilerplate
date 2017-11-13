import webpack from 'webpack';
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';

import { variables } from './defaults/variables';
import { environments } from './defaults/environments';
import { buildFavicon } from './webpack/build-favicon';
import { baseEnvironment } from './base.environment';

const devEnvironment = {
  ...baseEnvironment,
  devtool: 'cheap-module-source-map',
  plugins: [
    ...(baseEnvironment.plugins || []),
    new FaviconsWebpackPlugin(buildFavicon(true)),
    new webpack.DefinePlugin(variables(environments.dev)),
  ],
};

export default devEnvironment;
