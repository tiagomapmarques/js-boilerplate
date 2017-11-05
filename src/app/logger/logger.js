
export const Logger = {
  logError: (error) => {
    console.error(error); // eslint-disable-line no-console
    return error;
  },
  catch: (defaultValue) => (error) => {
    Logger.logError(error);
    return typeof defaultValue === 'function' ? defaultValue() : defaultValue;
  },
};
