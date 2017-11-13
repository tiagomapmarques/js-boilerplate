import { variables } from '../../environments/defaults/variables';

const { ENVIRONMENT } = variables(process.env.NODE_ENV);

const removeQuotes = (str) => {
  if (str.indexOf('\'') === 0 && str.lastIndexOf('\'') === str.length - 1) {
    str = str.substring(1, str.length - 1);
  }
  return str;
};

const unquotify = (object) => Object.keys(object).reduce((collection, key) => ({
  ...collection,
  [key]: typeof object[key] === 'string' ? removeQuotes(object[key]) : unquotify(object[key]),
}), {});

export const environment = unquotify(ENVIRONMENT);
