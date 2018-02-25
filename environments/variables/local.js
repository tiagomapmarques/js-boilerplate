import { environments } from '../';
import { page, project } from '../config';

export const env = {
  ENVIRONMENT: environments.local,
  VERSION: project.version,
  ROOTID: page.rootId,
  TITLE: page.title,
  DEFAULTS: {
    LOCALE: page.locale,
    LOCALE_SHORT: page.localeShort,
  },
  SERVICES: {
    ASSETS: '/assets/',
  },
};
