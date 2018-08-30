import { paths } from './paths';
import { project } from './project';

export const pageConfig = {
  title: 'Weather App',
  description: project.description,
  keywords: (project.keywords || []).join(','),
  author: project.author,
  copyright: 'https://raw.githubusercontent.com/tiagomapmarques/js-boilerplate/develop/LICENSE',
  locale: 'en_US',
  localeShort: 'en',
  rootId: 'app',
  template: '.index.ejs',
  cache: false,
};

const getPageConfig = minify => ({
  ...pageConfig,
  filename: `${paths.distAbsolute}/index.html`,
  template: `${paths.staticAbsolute}/${pageConfig.template}`,
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
