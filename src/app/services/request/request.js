import { RequestType } from './type';
import { RequestMethod } from './method';

export const RequestService = {
  fetchJson: (req, type = RequestType.assets, method = RequestMethod.get, extraConfig = {}) => {
    const config = {
      method,
      cache: 'default',
      ...extraConfig,
    };
    return fetch(`${type}${req}`, config).then(response => response.json());
  }
};
