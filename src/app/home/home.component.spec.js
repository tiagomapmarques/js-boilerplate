import React from 'react';
import { mount } from 'enzyme';

import { HomeComponent } from './';
import styles from './home.style';

jest.mock('./home.style', () => mockStyle(require.requireActual('./home.style')));

describe('HomeComponent', () => {
  const sampleDataUrl = `${VARIABLES.SERVICES.ASSETS}sample.json`;
  const sampleData = {
    text: 'Mock Content',
  };
  let component;

  const createComponent = (options = {}) => {
    component = mount(<HomeComponent {...(options.props || {})} />);
  };

  const querySelector = (selector) => {
    const elements = component.find(selector);
    return elements.length ? elements : null;
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

    it('fetches data from the correct url', () => {
      expect(fetch.mock.calls).toHaveLength(1);
      expect(fetch.mock.calls[0]).toEqual([sampleDataUrl]);
    });

    it('does not show the page content', () => {
      expect(querySelector(`.${styles.content}`)).toBe(null);
    });

    it('shows the footer', () => {
      expect(querySelector(`.${styles.footer}`).text().trim())
        .toBe(`v${VARIABLES.VERSION}-${VARIABLES.ENVIRONMENT}`);
    });

    describe('after the component updates', () => {
      beforeEach(() => {
        component.update();
      });

      it('shows the page content', () => {
        expect(component.text().trim()).toContain(`${VARIABLES.TITLE} says ${sampleData.text}!`);
        // FIXME enzyme does not update the VDOM correctly and "find" does not
        // find the class inside the component even though the DOM is correct.
        // more details: https://github.com/airbnb/enzyme/issues/1233
        // expect(querySelector(`.${styles.content}`).text().trim())
        //   .toBe(`${VARIABLES.TITLE} says ${sampleData.text}!`);
      });
    });
  });

  const testResponseStatus = (statusCode) => {
    describe(`when fetch returns a ${statusCode}`, () => {
      beforeEach(() => {
        fetch.mockResponse(JSON.stringify(sampleData), { status: statusCode });
        createComponent();
        component.update();
      });

      afterEach(() => {
        fetch.resetMocks();
      });

      it('does not show the page content', () => {
        expect(querySelector(`.${styles.content}`)).toBe(null);
      });
    });
  };

  [403, 404, 500].forEach(testResponseStatus);
});
