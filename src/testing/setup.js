
global.fdescribe = (str, func) => global.describe.only(str, func);
global.fit = (str, func) => global.test.only(str, func);
global.ftest = (str, func) => global.test.only(str, func);

global.fetch = require('jest-fetch-mock');

global.mockConsole = require('./mock-console').default;

global.createElement = require('./create-element').default;

global.TestImports = require('./test-imports').default;
TestImports.reset();
