import { environments } from './environments';

export const webpackInit = (requestedEnv) => {
  process.env.NODE_ENV = environments[requestedEnv];

  // eslint-disable-next-line global-require,import/no-dynamic-require
  return require(`./${requestedEnv}.config`).config;
};
