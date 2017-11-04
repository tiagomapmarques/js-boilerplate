import * as FaviconsWebpackPlugin from 'favicons-webpack-plugin';

import { paths } from './paths';
import { page } from './page';
import { favicon } from './favicon';

const variants: FaviconsWebpackPlugin.VariantName[] = ['android', 'appleIcon', 'appleStartup', 'coast', 'firefox', 'opengraph', 'twitter', 'yandex', 'windows'];

const listToVariants = (variantArray: FaviconsWebpackPlugin.VariantName[], defaultValue: boolean): FaviconsWebpackPlugin.Variants =>
  variantArray.reduce((collection, variant) => ({
    ...collection,
    [variant]: !!defaultValue || false,
  }), {}) as FaviconsWebpackPlugin.Variants;

export const buildFavicon = (additionalVariants: boolean | FaviconsWebpackPlugin.VariantName[] = false, overrides: FaviconsWebpackPlugin.Configuration = {}): FaviconsWebpackPlugin.Configuration => {
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
