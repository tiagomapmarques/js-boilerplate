import { okResult, errorResult } from 'vuex-automap';

import { WeatherService } from 'services';

export const actions = {
  init: ({ commit, getters }) => new Promise((resolve) => {
    if (getters.isStatusInit) {
      commit('setData', []);
      commit('setReady');
      resolve(okResult());
    } else {
      resolve(errorResult('State already initialized.'));
    }
  }),

  get: ({ commit, getters }, { cityKey, useMockApi }) => new Promise((resolve, reject) => {
    if (getters.isStatusReady) {
      commit('setLoading');
      WeatherService.getFiveDayForecast(cityKey, useMockApi).then((data) => {
        commit('setData', data);
        commit('setReady');
        resolve(okResult());
      }).catch(() => {
        commit('setError');
        reject(errorResult('Service returned an error.'));
      });
    } else {
      resolve(errorResult('State not ready.'));
    }
  }),
};
