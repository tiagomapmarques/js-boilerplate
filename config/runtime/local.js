import { environments } from '../environments';
import { pageConfig, project } from '../settings';

export const env = {
  ENVIRONMENT: environments.local,
  PROJECT: {
    TITLE: pageConfig.title,
    ROOTID: pageConfig.rootId,
    VERSION: project.version,
  },
  DEFAULTS: {
    LOCALE: pageConfig.locale,
    LOCALE_SHORT: pageConfig.localeShort,
  },
  SERVICES: {
    ASSETS: '/assets/',
  },
};
