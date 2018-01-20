import { environments } from '../';

// eslint-disable-next-line global-require,import/no-dynamic-require
const getConfig = environment => require(`./${environment}.config`).config;

export const webpackInit = (requestedEnv) => {
  process.env.NODE_ENV = environments[requestedEnv];
  return getConfig(requestedEnv);
};
