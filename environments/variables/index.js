
export const variables = (environment) => ({
  'process.env': {
    NODE_ENV: `${environment}`,
  },
  ENVIRONMENT: {
    ...(require(`./${environment}`).default),
  },
});
