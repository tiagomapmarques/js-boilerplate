import { RequestService } from '../request';

export const SampleService = {
  getData: () => RequestService.fetchJson('sample.json'),
};
