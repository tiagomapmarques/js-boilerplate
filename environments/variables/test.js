import { packageJson } from './package-json';

export const testEnvironment = {
  ENVIRONMENT: 'test',
  VERSION: packageJson.version,
  TITLE: 'MockTitle',
  SERVICES: {
    ASSETS: '/mock-assets/',
  },
};
