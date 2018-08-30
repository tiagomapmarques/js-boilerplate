import { pageConfig, paths } from '../settings';

// eslint-disable-next-line global-require,import/no-dynamic-require
export const localeData = require(`${paths.staticAbsolute}/locale/${pageConfig.locale}`);
