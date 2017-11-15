import webpack from 'webpack';
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';

import { environments } from '../';
import { variables } from '../variables';
import { faviconConfigAll } from './builders/favicon-config';
import { baseConfig } from './base.config';

const devConfig = {
  ...baseConfig,
  devtool: 'cheap-module-source-map',
  plugins: [
    ...(baseConfig.plugins || []),
    new FaviconsWebpackPlugin(faviconConfigAll),
    new webpack.DefinePlugin(variables(environments.dev)),
  ],
};

export default devConfig;
