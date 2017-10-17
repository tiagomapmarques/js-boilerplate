import Vue from 'vue';
import Vuex from 'vuex';
import { replaceState } from 'vuex-automap';

import { module as sample } from './sample';

const modules = {
  sample,
};

export const createStore = (initialState = {}) => {
  Vue.use(Vuex);
  return new Vuex.Store({ modules: replaceState(modules, initialState) });
};
