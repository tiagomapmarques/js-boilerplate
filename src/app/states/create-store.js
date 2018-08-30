import Vue from 'vue';
import Vuex from 'vuex';
import { replaceState } from 'vuex-automap';

import { module as locale } from './locale';
import { module as metric } from './metric';
import { module as forecast } from './forecast';
import { module as mockapi } from './mockapi';

const modules = {
  locale,
  metric,
  forecast,
  mockapi,
};

export const createStore = (initialState = {}) => {
  Vue.use(Vuex);
  return new Vuex.Store({ modules: replaceState(modules, initialState) });
};
