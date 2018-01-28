import { packageJson } from './package-json';
import { paths } from './paths';

export const pageConfig = {
  title: 'Js Boilerplate',
  description: packageJson.description,
  keywords: packageJson.keywords.join(','),
  author: packageJson.author,
  copyright: 'https://raw.githubusercontent.com/tiagomapmarques/js-boilerplate/develop/LICENSE',
  rootId: 'app',
  template: '.index.ejs',
  cache: false,
};

const getPageConfig = minify => ({
  ...pageConfig,
  filename: `${paths.distAbsolute}/index.html`,
  template: `${paths.staticAbsolute}/${pageConfig.template}`,
  cache: pageConfig.cache,
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
