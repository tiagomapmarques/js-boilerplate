import { environments } from '../';
import { pageConfig, packageJson } from '../webpack/settings';

export const env = {
  ENVIRONMENT: environments.local,
  VERSION: packageJson.version,
  ROOTID: pageConfig.rootId,
  TITLE: pageConfig.title,
  SERVICES: {
    ASSETS: '/assets/',
  },
};
