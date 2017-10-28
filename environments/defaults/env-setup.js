
export default (environment) => ({
  'process.env': {
    'NODE_ENV': `'${environment}'`,
  },
});
