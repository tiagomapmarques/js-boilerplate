import { environments } from 'environments';
import { pageConfig, packageJson } from 'environments/webpack/settings';

export const env = {
  ENVIRONMENT: environments.prod,
  VERSION: packageJson.version,
  TITLE: pageConfig.title,
  SERVICES: {
    ASSETS: '/assets/',
  },
};
