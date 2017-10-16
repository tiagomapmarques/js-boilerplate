import { resolve } from 'path';

const paths = {};
paths.base = './';
paths.app = `${paths.base}src/app/`;
paths.dist = `${paths.base}public/assets/`;
paths.baseAbsolute = resolve(paths.base);
paths.appAbsolute = resolve(paths.app);
paths.distAbsolute = resolve(paths.dist);

export default paths;
