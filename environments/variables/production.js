import { environments } from '../';
import { page, project } from '../config';

export const env = {
  ENVIRONMENT: environments.prod,
  VERSION: project.version,
  ROOTID: page.rootId,
  TITLE: page.title,
  SERVICES: {
    ASSETS: '/assets/',
  },
};
