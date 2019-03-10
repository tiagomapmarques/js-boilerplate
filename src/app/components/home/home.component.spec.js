import { shallowMount } from '@vue/test-utils';

import { HelperService } from 'services';

import { HomeComponent } from '.';
import style from './home.style';

jest.mock('services');

jest.mock('./home.style', () => global.mockStyle(require.requireActual('./home.style')));

describe('HomeComponent', () => {
  const sampleData = { text: 'Mock Content' };
  let component;

  const createComponent = () => {
    component = shallowMount(HomeComponent);
    component.vm.$forceUpdate();
  };

  const querySelector = (selector) => component.vm.$el.querySelector(selector);

  const mockGetJson = (newData = null) => jest
    .fn((_, data) => new Promise((resolve) => resolve(newData === null ? data : newData)));

  describe('no errors occur fetching', () => {
    beforeEach(() => {
      HelperService.getJson = mockGetJson(sampleData);
      createComponent();
    });

    it('mounts the component', () => {
      // eslint-disable-next-line no-underscore-dangle
      expect(component.vm._isMounted).toBeTruthy();
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
