import { render } from 'inferno';

import { mockCreateElement } from 'testing';
import { HelperService } from 'services';

import { HomeComponent } from '.';
import style from './home.style';

jest.mock('inferno', () => {
  const realInferno = jest.requireActual('inferno');
  const realRender = realInferno.render;
  realInferno.render = jest.fn(realRender);
  return realInferno;
});

jest.mock('services');

jest.mock('./home.style', () => global.mockStyle(require.requireActual('./home.style')));

describe('HomeComponent', () => {
  const sampleData = { text: 'Mock Content' };
  let component;

  mockCreateElement(document.body, 'div', { id: PROJECT.ROOTID });

  const createComponent = (options = {}) => {
    const elementToBeReplaced = document.querySelector(`#${PROJECT.ROOTID}`);
    render(<HomeComponent {...(options.props || {})} />, elementToBeReplaced);
    component = document.querySelector(`#${PROJECT.ROOTID}`);
  };

  const querySelector = (selector) => {
    const elements = component.querySelectorAll(selector);
    return elements.length > 1 ? elements : (elements[0] || null);
  };

  const mockGetJson = (newData = null) => jest
    .fn((_, data) => new Promise(resolve => resolve(newData === null ? data : newData)));

  describe('no errors occur fetching', () => {
    beforeEach(() => {
      HelperService.getJson = mockGetJson(sampleData);
      createComponent();
    });

    it('mounts the component', () => {
      expect(component).toBeTruthy();
    });

    it('fetches data from the correct url', () => {
      expect(HelperService.getJson.mock.calls).toHaveLength(1);
      expect(HelperService.getJson.mock.calls[0][0]).toEqual('sample');
    });

    it('shows the page content', () => {
      expect(querySelector(`.${style.content}`).textContent.trim())
        .toBe(`${PROJECT.TITLE} says ${sampleData.text}!`);
    });

    it('shows the footer', () => {
      expect(querySelector(`.${style.footer}`).textContent.trim())
        .toBe(`v${PROJECT.VERSION}-${ENVIRONMENT}`);
    });
  });

  describe('an error occurs fetching', () => {
    beforeEach(() => {
      HelperService.getJson = mockGetJson();
      createComponent();
    });

    it('does not show content', () => {
      expect(querySelector(`.${style.content}`)).toBe(null);
    });
  });
});
