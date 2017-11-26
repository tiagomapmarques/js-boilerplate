/* eslint-disable import/no-extraneous-dependencies */
import 'raf/polyfill';
import enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import fetchMock from 'jest-fetch-mock';
/* eslint-enable import/no-extraneous-dependencies */

import { environment } from './webpack-variables';
import { createElement } from './create-element';
import { mockConsole } from './mock-console';
import { TestImports } from './test-imports';

enzyme.configure({ adapter: new Adapter() });

// creating environment variables
global.ENVIRONMENT = environment;

// overriding globals
global.fetch = fetchMock;

// declaring test helper functions
global.mockConsole = mockConsole;
global.createElement = createElement;
global.TestImports = TestImports;
