import { okResult, errorResult } from 'vuex-automap';

import { TranslationService } from 'services';

export const actions = {
  change: ({ commit }, newLocale) => new Promise((resolve, reject) => {
    commit('setLoading');
    TranslationService.getLocale(newLocale).then((data) => {
      commit('setData', data);
      commit('setReady');
      resolve(okResult());
    }).catch(() => {
      commit('setError');
      reject(errorResult('Service returned an error.'));
    });
  }),
};
