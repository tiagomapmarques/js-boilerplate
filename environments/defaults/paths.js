import { resolve } from 'path';

const paths = {};
paths.base = './';
paths.app = `${paths.base}src/app/`;
paths.assets = `${paths.base}src/assets/`;
paths.dist = `${paths.base}public/`;
paths.distAssets = `${paths.dist}assets/`;
paths.baseAbsolute = resolve(paths.base);
paths.appAbsolute = resolve(paths.app);
paths.assetsAbsolute = resolve(paths.assets);
paths.distAbsolute = resolve(paths.dist);
paths.distAssetsAbsolute = resolve(paths.distAssets);

export default paths;
