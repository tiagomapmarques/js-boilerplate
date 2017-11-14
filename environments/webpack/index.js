import { environments } from '../';

const defaultEnv = 'dev';

export const getConfig = (requestedEnv) => {
  const env = requestedEnv || defaultEnv;
  const environment = environments[env];
  const config = require(`./${env}.config`);
  return { environment, config };
};
