import { page } from '../defaults/page';
import { paths } from './paths';

export const buildPage = (minify = false, overrides = {}) => ({
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