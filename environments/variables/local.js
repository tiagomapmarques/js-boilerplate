import { page } from '../webpack/builders';
import { packageJson } from './package-json';

export const localEnvironment = {
  ENVIRONMENT: 'local',
  VERSION: packageJson.version,
  TITLE: page.title,
  SERVICES: {
    ASSETS: '/assets/',
  },
};
