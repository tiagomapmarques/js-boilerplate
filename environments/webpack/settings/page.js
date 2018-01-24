import { paths } from './paths';

export const pageConfig = {
  title: 'Js Boilerplate',
  template: '.index.ejs',
  cache: false,
};

const getPageConfig = minify => ({
  title: pageConfig.title,
  filename: `${paths.distAbsolute}/index.html`,
  template: `${paths.staticAbsolute}/${pageConfig.template}`,
  cache: pageConfig.cache,
  ...(minify ? {
    minify: {
      collapseWhitespace: true,
      keepClosingSlash: true,
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
