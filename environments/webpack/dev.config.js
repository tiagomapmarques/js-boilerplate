import FaviconsWebpackPlugin from 'favicons-webpack-plugin';
import ExtendedDefinePlugin from 'extended-define-webpack-plugin';

import { environments } from 'environments';
import { getVariables } from 'environments/variables';

import { favicon } from './settings';
import { baseConfig } from './base.config';

export const config = {
  ...baseConfig,
  plugins: [
    ...(baseConfig.plugins || []),
    new FaviconsWebpackPlugin(favicon.all),
    new ExtendedDefinePlugin(getVariables(environments.dev)),
  ],
};
