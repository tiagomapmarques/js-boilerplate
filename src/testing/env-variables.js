import { variables } from '../../environments/defaults/variables';

const { ENVIRONMENT } = variables(process.env.NODE_ENV);

const removeQuotes = (str) => {
  str = str.indexOf('\'') === 0 ? str.substring(1) : str;
  str = str.indexOf('\'') === str.length - 1 ? str.substring(0, str.length - 1) : str;
  return str;
};

const unquotify = (object) => Object.keys(object).reduce((collection, key) => ({
  ...collection,
  [key]: typeof object[key] === 'string' ? removeQuotes(object[key]) : unquotify(object[key]),
}), {});

export const environment = unquotify(ENVIRONMENT);
