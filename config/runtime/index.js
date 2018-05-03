
export const getVariables = environment => ({
  'process.env': {
    NODE_ENV: `${environment}`,
  },
  VARIABLES: {
    // eslint-disable-next-line global-require,import/no-dynamic-require
    ...require(`./${environment}`).env,
  },
});
