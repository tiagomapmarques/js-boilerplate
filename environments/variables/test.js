import { packageJson } from 'environments/webpack/settings';

export const env = {
  ENVIRONMENT: 'test',
  VERSION: packageJson.version,
  TITLE: 'MockTitle',
  SERVICES: {
    ASSETS: '/mock-assets/',
  },
};
