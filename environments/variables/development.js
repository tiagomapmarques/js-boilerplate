import { environments } from '../';
import { packageJson } from '../package-json';
import { pageConfig } from '../webpack/settings';

export const env = {
  ENVIRONMENT: environments.dev,
  VERSION: packageJson.version,
  TITLE: pageConfig.title,
  SERVICES: {
    ASSETS: '/assets/',
  },
};
