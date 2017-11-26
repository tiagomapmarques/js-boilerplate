import { localEnvironment as local } from './local';
import { devEnvironment as development } from './development';
import { prodEnvironment as production } from './production';
import { testEnvironment as test } from './test';

const environmentVariables = {
  local,
  development,
  production,
  test,
};

export const variables = environment => ({
  'process.env': {
    NODE_ENV: `${environment}`,
  },
  ENVIRONMENT: {
    ...environmentVariables[environment],
  },
});
