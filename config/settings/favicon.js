import { pageConfig } from './page';
import { paths } from './paths';

export const faviconConfig = {
  cache: false,
  location: 'favicon',
  original: '.favicon.png',
  additionalVariants: [],
};

const allVariants = [
  'android',
  'appleIcon',
  'appleStartup',
  'coast',
  'firefox',
  'opengraph',
  'twitter',
  'yandex',
  'windows',
];

const listToVariants = (variantArray, defaultValue) =>
  variantArray.reduce((collection, variant) => ({
    ...collection,
    [variant]: defaultValue,
  }), {});

const getFaviconConfig = minify => ({
  title: pageConfig.title,
  logo: `${paths.staticAbsolute}/${faviconConfig.original}`,
  prefix: `${faviconConfig.location}/`,
  persistentCache: faviconConfig.cache,
  icons: {
    favicons: true,
    ...listToVariants(allVariants, false),
    ...listToVariants([
      ...faviconConfig.additionalVariants,
      ...(!minify ? allVariants : []),
    ], true),
  },
});

export const favicon = {
  minimum: getFaviconConfig(true),
  all: getFaviconConfig(false),
};
