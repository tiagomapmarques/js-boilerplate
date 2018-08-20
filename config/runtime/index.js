import { environments } from '../environments';

export const getVariables = (environment = environments.default) => ({
  'process.env': {
    NODE_ENV: `${environment}`,
  },
  VARIABLES: {
    // eslint-disable-next-line global-require,import/no-dynamic-require
    ...require(`./${environment}`).env,
  },
});
