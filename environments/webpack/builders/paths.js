import { resolve } from 'path';

const pathsBase = './';

export const paths = {
  base: pathsBase,
  app: `${pathsBase}src/app/`,
  assets: `${pathsBase}src/assets/`,
  dist: `${pathsBase}public/`,
  distAssets: '',
  baseAbsolute: '',
  appAbsolute: '',
  assetsAbsolute: '',
  distAbsolute: '',
  distAssetsAbsolute: '',
};

paths.distAssets = `${paths.dist}assets/`;
paths.baseAbsolute = resolve(paths.base);
paths.appAbsolute = resolve(paths.app);
paths.assetsAbsolute = resolve(paths.assets);
paths.distAbsolute = resolve(paths.dist);
paths.distAssetsAbsolute = resolve(paths.distAssets);
