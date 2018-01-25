import { packageJson } from './package-json';
import { paths } from './paths';

export const pageConfig = {
  title: 'Js Boilerplate',
  description: packageJson.description,
  keywords: packageJson.keywords.reduce((collection, word) => `${collection},${word}`, '').substr(1),
  author: packageJson.author,
  copyright: 'https://raw.githubusercontent.com/tiagomapmarques/js-boilerplate/develop/LICENSE',
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
