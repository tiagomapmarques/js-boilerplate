import { resolve } from 'path';
import { parse } from 'dotenv';

import { environments } from '../environments';

const getDotEnv = () => {
  try {
    // eslint-disable-next-line global-require
    const read = require('fs').readFileSync;
    return parse(read(resolve(process.cwd(), '.env')));
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
    ...getDotEnv(),
  },
});
