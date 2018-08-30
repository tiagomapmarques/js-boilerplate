import { statusGetters } from 'vuex-automap';

export const getters = {
  ...statusGetters(),

  get({ state }) {
    return state.data ? 'C' : 'F';
  },
};
