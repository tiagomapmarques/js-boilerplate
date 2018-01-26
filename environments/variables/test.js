import { packageJson } from '../webpack/settings';

export const env = {
  ENVIRONMENT: 'test',
  VERSION: packageJson.version,
  TITLE: 'MockTitle',
  SERVICES: {
    ASSETS: '/mock-assets/',
  },
};
