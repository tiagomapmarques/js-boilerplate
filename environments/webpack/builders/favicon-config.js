import { page } from './page';
import { favicon, allVariants } from './favicon';
import { paths } from './paths';

const listToVariants = (variantArray, defaultValue) =>
  variantArray.reduce((collection, variant) => ({
    ...collection,
    [variant]: defaultValue || false,
  }), {});

const buildFaviconConfig = minify => ({
  title: page.title,
  logo: `${paths.staticAbsolute}/${favicon.original}`,
  prefix: `${favicon.location}/`,
  persistentCache: favicon.cache,
  icons: {
    favicons: true,
    ...listToVariants(allVariants, false),
    ...listToVariants([
      ...favicon.additionalVariants,
      ...(!minify ? allVariants : []),
    ], true),
  },
});

export const faviconConfig = buildFaviconConfig(true);
export const faviconConfigAll = buildFaviconConfig(false);
