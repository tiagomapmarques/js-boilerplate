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
  // eslint-disable-next-line global-require,import/no-dynamic-require
  ...require(`./${environment}`).env,
  ...getDotEnv(),
});
