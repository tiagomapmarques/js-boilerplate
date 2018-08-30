import { okResult } from 'vuex-automap';

export const actions = {
  changeToFahrenheit: ({ commit }) => new Promise((resolve) => {
    commit('setData', 'F');
    resolve(okResult());
  }),

  changeTCelsius: ({ commit }) => new Promise((resolve) => {
    commit('setData', 'C');
    resolve(okResult());
  }),
};
