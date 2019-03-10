const { env } = require('./.babelrc');

const alias = ((env.test.plugins.find(([name]) => name === 'babel-plugin-module-resolver') || [])[1] || {}).alias || {};

const moduleNameMapper = Object.keys(alias).reduce((accumulator, key) => ({
  ...accumulator,
  [key]: (key.indexOf('$') >= 0 ? alias[key] : `${alias[key]}$1`).replace('./', '<rootDir>/'),
}), {});

const extensions = ['js', 'ts'];
const styleExtensions = ['css', 'scss'];

const applyExt = (prefix, exts = extensions) => exts.map(e => `${prefix}.${e}`);

module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    ...applyExt('src/app/**/*'),
    '!src/app/**/*.d.ts',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: [
    'json',
    'lcov',
  ],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  moduleFileExtensions: [
    ...extensions,
    ...styleExtensions,
  ],
  moduleNameMapper,
  setupFiles: [
    './src/testing/jest',
  ],
  testRegex: '^.+\\.spec\\.(j|t)s$',
  transform: {
    '^.+\\.(j|t)s$': 'babel-jest',
    '^.+\\.s?css$': 'jest-css-modules-transform',
  },
  transformIgnorePatterns: [],
}
