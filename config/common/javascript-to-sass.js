
const isNumber = (variable) => {
  const value = parseInt(variable, 10);
  // Comparing against itself to check if it is NaN
  // eslint-disable-next-line no-self-compare
  return value === value && typeof value === 'number';
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
