import * as HtmlWebpackPlugin from 'html-webpack-plugin';

import { paths } from './paths';
import { page } from './page';

export const buildPage = (minify: boolean = false, overrides: HtmlWebpackPlugin.Options = {}): HtmlWebpackPlugin.Options => ({
  title: page.title,
  filename: `${paths.distAbsolute}/index.html`,
  template: `!!html-loader!${paths.assetsAbsolute}/${page.template}`,
  cache: page.cache,
  ...(!minify ? {} : {
    minify: {
      collapseWhitespace: true,
      keepClosingSlash: true,
      minifyCSS: true,
      minifyJS: true,
      quoteCharacter: '"',
      removeComments: true,
    },
  }),
  ...(overrides || {}),
});
