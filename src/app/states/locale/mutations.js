import { stateStatus } from 'vuex-automap';

export const mutations = {
  /* eslint-disable no-param-reassign */
  setError(state) {
    state.status = stateStatus.error;
  },
  setLoading(state) {
    state.status = stateStatus.loading;
  },
  setReady(state) {
    state.status = stateStatus.ready;
  },
  setData(state, data) {
    state.data = data;
  },
  /* eslint-enable no-param-reassign */
};
