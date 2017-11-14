import { page } from './page';
import { paths } from './paths';

const buildPageConfig = (minify) => ({
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
});

export const pageConfig = buildPageConfig(false);
export const pageConfigMinified = buildPageConfig(true);
