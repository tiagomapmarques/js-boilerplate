import { okResult } from 'vuex-automap';

export const actions = {
  use: ({ commit }) => new Promise((resolve) => {
    commit('setData', true);
    resolve(okResult());
  }),

  dontUse: ({ commit }) => new Promise((resolve) => {
    commit('setData', false);
    resolve(okResult());
  }),
};
