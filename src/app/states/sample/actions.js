import { okResult, errorResult } from 'vuex-automap';

import { SampleService } from 'services';

export const actions = {
  init: ({ commit, state, getters }) => new Promise((resolve) => {
    if (getters.isStatusInit) {
      commit('setLoading');
      SampleService.getData().then(data => {
        commit('setData', data);
        commit('setReady');
        resolve(okResult());
      }).catch(() => {
        commit('setError');
        resolve(errorResult('Service returned an error.'));
      });
    } else {
      resolve(errorResult('State already initialized.'));
    }
  }),
};
