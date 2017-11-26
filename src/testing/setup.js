/* eslint-disable import/no-extraneous-dependencies */
import 'raf/polyfill';
import enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import fetchMock from 'jest-fetch-mock';
/* eslint-enable import/no-extraneous-dependencies */

import { variables } from './webpack-variables';
import { createElement } from './create-element';
import { mockConsole } from './mock-console';
import { mockStyle } from './mock-style';
import { TestImports } from './test-imports';

enzyme.configure({ adapter: new Adapter() });

// creating environment variables
global.VARIABLES = variables;

// overriding globals
global.fetch = fetchMock;

// declaring test helper functions
global.mockStyle = mockStyle;
global.mockConsole = mockConsole;
global.createElement = createElement;
global.TestImports = TestImports;
