
export const Logger = {
  logError: (error) => {
    console.error(error); // eslint-disable-line no-console
    return error;
  },
  catch: (error) => {
    return Logger.logError(error);
  },
};
