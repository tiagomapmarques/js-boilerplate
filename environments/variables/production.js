import { page } from '../webpack/builders';
import { packageJson } from './package-json';

export const prodEnvironment = {
  ENVIRONMENT: 'production',
  VERSION: packageJson.version,
  TITLE: page.title,
  SERVICES: {
    ASSETS: '/assets/',
  },
};
