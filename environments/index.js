import { environments } from './defaults/environments';

const defaultEnvironment = 'dev';

export const getConfig = (requestedEnv) => {
  const env = requestedEnv || defaultEnvironment;
  const environment = environments[env];
  const config = require(`./${env}.environment`);
  return { environment, config };
};
