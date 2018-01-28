import { page as config, paths } from '../../config';

const getPageConfig = minify => ({
  ...config,
  filename: `${paths.distAbsolute}/index.html`,
  template: `${paths.staticAbsolute}/${config.template}`,
  cache: config.cache,
  ...(minify ? {
    minify: {
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true,
      quoteCharacter: '"',
      removeComments: true,
    },
  } : {}),
});

export const page = {
  pretty: getPageConfig(false),
  minified: getPageConfig(true),
};
