import FaviconsWebpackPlugin from 'favicons-webpack-plugin';
import ExtendedDefinePlugin from 'extended-define-webpack-plugin';

import { environments } from '../';
import { getVariables } from '../variables';
import { faviconConfigAll } from './builders';
import { baseConfig } from './base.config';

export const config = {
  ...baseConfig,
  devtool: 'cheap-module-source-map',
  plugins: [
    ...(baseConfig.plugins || []),
    new FaviconsWebpackPlugin(faviconConfigAll),
    new ExtendedDefinePlugin(getVariables(environments.dev)),
  ],
};
