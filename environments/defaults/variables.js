
const quotify = (object) => Object.keys(object).reduce((collection, key) => ({
  ...collection,
  [key]: typeof object[key] === 'string' ? `'${object[key]}'` : quotify(object[key]),
}), {});

export const variables = (environment) => quotify({
  'process.env': {
    NODE_ENV: `${environment}`,
  },
  ENVIRONMENT: {
    ...(require(`./environments/${environment}`).default),
  },
});
