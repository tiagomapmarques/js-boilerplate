import React from 'react';
import { mount } from 'enzyme';

import { HomeComponent } from './';

describe('HomeComponent', () => {
  const sampleDataUrl = '/assets/sample.json';
  const sampleData = {
    console: 'mock console data',
    page: 'mock page data',
  };
  let component;

  mockConsole();

  const createComponent = (options = {}) => {
    component = mount(<HomeComponent {...(options.props || {})} />);
  };

  describe('when no errors occur', () => {
    beforeEach(() => {
      fetch.mockResponse(JSON.stringify(sampleData));
      createComponent();
    });

    afterEach(() => {
      fetch.resetMocks();
    });

    it('mounts the component', () => {
      expect(component).toBeTruthy();
    });

    it('has no data on the page', () => {
      expect(component.text().trim()).toBe('');
    });

    it('calls fetch with the correct path', () => {
      expect(fetch.mock.calls).toHaveLength(1);
      expect(fetch.mock.calls[0]).toEqual([sampleDataUrl]);
    });

    describe('after the component updates', () => {
      beforeEach(() => {
        component.update();
      });

      it('sets the page data correctly', () => {
        expect(component.text().trim()).toBe(sampleData.page);
      });

      it('logs the console data', () => {
        // eslint-disable-next-line no-console
        expect(console.log.mock.calls).toHaveLength(1);
        // eslint-disable-next-line no-console
        expect(console.log.mock.calls[0]).toEqual([sampleData.console]);
      });
    });
  });

  const responseErrors = [403, 404, 500];

  const testResponseStatus = (statusCode) => {
    describe(`when fetch returns a ${statusCode}`, () => {
      beforeEach(() => {
        fetch.mockResponse(JSON.stringify(sampleData), { status: statusCode });
        createComponent();
      });

      afterEach(() => {
        fetch.resetMocks();
      });

      describe('after the component updates', () => {
        beforeEach(() => {
          component.update();
        });

        it('does not set anything on the page', () => {
          expect(component.text().trim()).toBe('');
        });

        it('does not log anything to the console', () => {
          // eslint-disable-next-line no-console
          expect(console.log.mock.calls).toHaveLength(0);
        });
      });
    });
  };

  responseErrors.forEach(testResponseStatus);
});
