
export const envSetup = (environment) => ({
  'process.env': {
    NODE_ENV: `'${environment}'`,
  },
});
