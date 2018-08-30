import { RequestType } from './type';
import { RequestMethod } from './method';

const defaultHeaders = {
  cache: 'default',
};

export const RequestService = {
  getJson: (requestUrl, config = {}) => fetch(requestUrl, {
    method: RequestMethod.get,
    ...defaultHeaders,
    ...config,
  })
    .then(response => response.json())
    .catch(error => error),

  getAsset: (requestUrl, config = {}) => RequestService
    .getJson(`${RequestType.assets}${requestUrl}`, config),

  getLocale: (requestUrl, config = {}) => RequestService
    .getJson(`${RequestType.locale}${requestUrl}`, config),
};
