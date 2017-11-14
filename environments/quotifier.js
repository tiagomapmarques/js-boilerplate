import quote from 'quote';
import unquote from 'unquote';
import isArray from 'isarray';

const arrayReduce = (object, handler) => object.map(handler);
const objectReduce = (object, handler) => Object.keys(object).reduce((collection, key) => ({
  ...collection,
  [key]: handler(object[key]),
}), {});

const transformer = (keyHandler) => (element) => {
  return typeof element === 'string' ? keyHandler(element) : quotifyAction(keyHandler)(element);
};

const quotifyAction = (keyHandler) => (object) => {
  return (isArray(object) ? arrayReduce : objectReduce)(object, transformer(keyHandler));
};

export const quotifier = quotifyAction(quote);

export const unquotifier = quotifyAction(unquote);
