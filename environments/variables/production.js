import { environments } from '../';
import { pageConfig } from '../webpack/settings';
import { packageJson } from './package-json';

export const env = {
  ENVIRONMENT: environments.prod,
  VERSION: packageJson.version,
  TITLE: pageConfig.title,
  SERVICES: {
    ASSETS: '/assets/',
  },
};
