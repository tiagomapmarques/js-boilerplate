import { page } from '../webpack/builders';
import { packageJson } from './package-json';

export const devEnvironment = {
  ENVIRONMENT: 'development',
  VERSION: packageJson.version,
  TITLE: page.title,
  SERVICES: {
    ASSETS: '/assets/',
  },
};
