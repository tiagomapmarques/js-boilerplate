import 'browser-polyfills';
import loadEntry from 'load-entry';
import Vue from 'vue';
import VueRouter from 'vue-router';
import { stateStatus } from 'vuex-automap';

import { routes, render } from 'containers/router';
import { createStore } from 'states';

import './index.style';

export const indexEntry = () => {
  Vue.use(VueRouter);

  const router = new VueRouter({
    mode: 'history',
    routes,
  });

  const store = createStore({
    metric: {
      data: VARIABLES.DEFAULTS.METRIC,
      status: stateStatus.ready,
    },
    locale: {
      data: VARIABLES.DEFAULTS.LOCALE_DATA,
      status: stateStatus.ready,
    },
    mockapi: {
      data: false,
      status: stateStatus.ready,
    },
  });

  return new Vue({
    el: `#${VARIABLES.ROOTID}`,
    store,
    router,
    render,
  });
};

loadEntry(exports);
