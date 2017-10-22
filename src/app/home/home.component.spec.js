import { shallow } from 'vue-test-utils';
import HomeComponent from './';

describe('HomeComponent', () => {
  const sampleData = {
    page: 'mock page data',
    console: 'mock console data',
  };
  let component;

  mockConsole();

  beforeEach(() => {
    fetch.mockResponse(JSON.stringify(sampleData));
    component = shallow(HomeComponent);
  });

  afterEach(() => {
    fetch.resetMocks();
  });

  it('initializes', () => {
    expect(component.vm._isMounted).toBeTruthy();
    expect(component.text().trim()).toBe('');
  });

  it('fetches the data from the correct source', () => {
    expect(fetch.mock.calls).toHaveLength(1);
    expect(fetch.mock.calls[0]).toEqual(['/assets/sample.json']);
  });

  it('sets the page data', () => {
    component.update();
    expect(component.text().trim()).toBe(sampleData.page);
  });

  it('logs the console data', () => {
    expect(console.log.mock.calls).toHaveLength(1); // eslint-disable-line no-console
    expect(console.log.mock.calls[0]).toEqual([sampleData.console]); // eslint-disable-line no-console
  });
});
