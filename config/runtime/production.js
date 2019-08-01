import { environments } from '../environments';
import { project } from '../common/project';
import { pageConfig } from '../settings';

export const env = {
  ENVIRONMENT: environments.prod,
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
