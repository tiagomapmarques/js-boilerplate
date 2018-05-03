import { environments } from '../environments';
import { pageConfig, project } from '../settings';

export const env = {
  ENVIRONMENT: environments.dev,
  VERSION: project.version,
  ROOTID: pageConfig.rootId,
  TITLE: pageConfig.title,
  DEFAULTS: {
    LOCALE: pageConfig.locale,
    LOCALE_SHORT: pageConfig.localeShort,
  },
  SERVICES: {
    ASSETS: '/assets/',
  },
};