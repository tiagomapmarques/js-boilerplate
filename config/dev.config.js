import FaviconsWebpackPlugin from 'favicons-webpack-plugin';
import ExtendedDefinePlugin from 'extended-define-webpack-plugin';
import PrerenderSpaPlugin from 'prerender-spa-plugin';
import CriticalCssPlugin from 'critical-css-webpack-plugin';

import { environments } from './environments';
import { getVariables } from './runtime';
import { app, favicon } from './settings';
import { baseConfig } from './base.config';

export const config = {
  ...baseConfig,
  plugins: [
    ...(baseConfig.plugins || []),
    new FaviconsWebpackPlugin(favicon.all),
    new ExtendedDefinePlugin(getVariables(environments.dev)),
    new PrerenderSpaPlugin(app.rendering.staticDir, app.rendering.routes),
    new CriticalCssPlugin({
      base: paths.distAbsolute,
    }),
  ],
};
