import { project } from '../config';

export const env = {
  ENVIRONMENT: 'test',
  VERSION: project.version,
  ROOTID: 'mock-root-id',
  TITLE: 'Mock Title',
  SERVICES: {
    ASSETS: '/mock-assets/',
  },
};
