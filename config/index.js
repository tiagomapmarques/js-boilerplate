import { environments } from './environments';

export const webpackInit = (requestedEnv) => {
  const actualEnv = (requestedEnv && environments[requestedEnv]) || environments.default;
  process.env.NODE_ENV = actualEnv;

  // eslint-disable-next-line global-require,import/no-dynamic-require
  return require(`./${actualEnv}.config`).config;
};
