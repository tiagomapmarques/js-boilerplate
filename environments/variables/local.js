import { environments } from '../';
import { packageJson } from '../package-json';
import { pageConfig } from '../webpack/settings';

export const env = {
  ENVIRONMENT: environments.local,
  VERSION: packageJson.version,
  TITLE: pageConfig.title,
  SERVICES: {
    ASSETS: '/assets/',
  },
};
