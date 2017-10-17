import 'babel-polyfill';
import 'whatwg-fetch';

import Vue from 'vue';
import VueRouter from 'vue-router';

import { createStore } from 'states';
import HomeContainer from 'containers/home';

import './index.style';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: HomeContainer }
  ]
});

new Vue({ // eslint-disable-line no-new
  el: '#app',
  router,
  store: createStore(),
  render: f => f(HomeContainer)
});
