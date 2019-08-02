
const isNumber = (variable) => {
  const value = parseInt(variable, 10);
  // eslint-disable-next-line compat/compat
  return typeof value === 'number' && !Number.isNaN(value);
};

const toSassVariable = variable => (
  !isNumber(variable) && variable[0] !== '#' ? `'${variable}'` : variable
);

const flattenObject = (variables, prefix = '') => Object.keys(variables)
  .reduce((accumulator, key) => ({
    ...accumulator,
    ...(typeof variables[key] === 'object'
      ? flattenObject(variables[key], `${prefix}${prefix ? '_' : ''}${key}`)
      : { [`${prefix}${prefix ? '_' : ''}${key}`]: toSassVariable(variables[key]) }
    ),
  }), {});

export const javascriptToSass = (variables) => {
  const flattenVariables = flattenObject(variables);

  return Object.keys(flattenVariables)
    .reduce((accumulator, key) => `${accumulator}$${key}:${flattenVariables[key]};`, '');
};
