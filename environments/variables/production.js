import { environments } from '../';
import { pageConfig, packageJson } from '../webpack/settings';

export const env = {
  ENVIRONMENT: environments.prod,
  VERSION: packageJson.version,
  TITLE: pageConfig.title,
  SERVICES: {
    ASSETS: '/assets/',
  },
};
