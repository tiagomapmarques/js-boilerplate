import { packageJson } from './package-json';

export const env = {
  ENVIRONMENT: 'test',
  VERSION: packageJson.version,
  TITLE: 'MockTitle',
  SERVICES: {
    ASSETS: '/mock-assets/',
  },
};
