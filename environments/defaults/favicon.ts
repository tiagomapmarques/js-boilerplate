import * as FaviconsWebpackPlugin from 'favicons-webpack-plugin';

export interface ProjectFavicons {
  cache: boolean;
  location: string;
  original: string;
  additionalVariants: FaviconsWebpackPlugin.VariantName[];
}

export const favicon: ProjectFavicons = {
  cache: false,
  location: 'favicon',
  original: '.favicon.png',
  additionalVariants: [],
};
