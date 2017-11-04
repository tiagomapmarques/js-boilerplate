import { Logger } from './logger';

describe('Logger', () => {
  let error;
  let result;

  describe('#logError', () => {
    mockConsole('error');

    beforeEach(() => {
      error = new Error('logError');
      result = Logger.logError(error);
    });

    it('logs the error to the console', () => {
      expect(console.error.mock.calls).toHaveLength(1); // eslint-disable-line no-console
      expect(console.error.mock.calls[0]).toEqual([error]); // eslint-disable-line no-console
    });

    it('returns the given error', () => {
      expect(result).toBe(error);
    });
  });

  describe('#catch', () => {
    beforeEach(() => {
      error = new Error('catch');
      Logger.logError = jest.fn((e) => e);
      result = Logger.catch(error);
    });

    it('sends #logError the error', () => {
      expect(Logger.logError.mock.calls).toHaveLength(1);
      expect(Logger.logError.mock.calls[0]).toEqual([error]);
    });

    it('returns the given error', () => {
      expect(result).toBe(error);
    });
  });
});
