import { paths } from './paths';
import { page } from './page';
import { favicon } from './favicon';

const variants = ['android', 'appleIcon', 'appleStartup', 'coast', 'firefox', 'opengraph', 'twitter', 'yandex', 'windows'];

const listToVariants = (variantArray, defaultValue) =>
  variantArray.reduce((collection, variant) => ({
    ...collection,
    [variant]: !!defaultValue || false,
  }), {});

export const buildFavicon = (additionalVariants = false, overrides = {}) => {
  const envVariantsList = additionalVariants === true ? variants : (additionalVariants || []);
  const variantsList = favicon.additionalVariants.concat(envVariantsList);
  return {
    title: page.title,
    logo: `${paths.assetsAbsolute}/${favicon.original}`,
    prefix: `${favicon.location}/`,
    persistentCache: favicon.cache,
    icons: {
      favicons: true,
      ...listToVariants(variants, false),
      ...listToVariants(variantsList, true),
    },
    ...(overrides || {}),
  };
};
