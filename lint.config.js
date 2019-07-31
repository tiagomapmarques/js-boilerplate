const { readFileSync } = require('fs');

module.exports = {
  logic: JSON.parse(readFileSync('./.eslintrc.code').toString()),
};
