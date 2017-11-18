
export const variables = environment => ({
  'process.env': {
    NODE_ENV: `${environment}`,
  },
  ENVIRONMENT: {
    // eslint-disable-next-line global-require,import/no-dynamic-require
    ...(require(`./${environment}`).default),
  },
});
