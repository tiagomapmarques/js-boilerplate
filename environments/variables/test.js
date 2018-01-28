import { packageJson } from '../webpack/settings';

export const env = {
  ENVIRONMENT: 'test',
  VERSION: packageJson.version,
  ROOTID: 'mock-root-id',
  TITLE: 'Mock Title',
  SERVICES: {
    ASSETS: '/mock-assets/',
  },
};
