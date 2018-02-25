import { project } from '../config';

export const env = {
  ENVIRONMENT: 'test',
  VERSION: project.version,
  ROOTID: 'mock-root-id',
  TITLE: 'Mock Title',
  DEFAULTS: {
    LOCALE: 'en_US',
    LOCALE_SHORT: 'en',
  },
  SERVICES: {
    ASSETS: '/mock-assets/',
  },
};
