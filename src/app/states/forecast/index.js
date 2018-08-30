import { initialState as state } from './initial-state';
import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';

export const module = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
