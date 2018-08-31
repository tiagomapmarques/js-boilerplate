import { parse } from 'dotenv';
import { readFileSync } from 'fs';

import { environments } from '../environments';

const getDotEnv = () => {
  try {
    return parse(readFileSync('.env'));
  } catch (_) {
    return {};
  }
};

export const getVariables = (environment = environments.default) => ({
  'process.env': {
    NODE_ENV: `${environment}`,
  },
  VARIABLES: {
    // eslint-disable-next-line global-require,import/no-dynamic-require
    ...require(`./${environment}`).env,
    ...(environment !== 'test' ? getDotEnv() : {}),
  },
});
