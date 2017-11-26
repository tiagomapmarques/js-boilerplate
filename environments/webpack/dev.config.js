import FaviconsWebpackPlugin from 'favicons-webpack-plugin';
import ExtendedDefinePlugin from 'extended-define-webpack-plugin';

import { environments } from '../';
import { variables } from '../variables';
import { faviconConfigAll } from './builders/favicon-config';
import { baseConfig } from './base.config';

export const devConfig = {
  ...baseConfig,
  devtool: 'cheap-module-source-map',
  plugins: [
    ...(baseConfig.plugins || []),
    new FaviconsWebpackPlugin(faviconConfigAll),
    new ExtendedDefinePlugin(variables(environments.dev)),
  ],
};