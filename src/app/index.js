import 'browser-polyfills';
import Vue from 'vue';
import HomeComponent from 'app/home';

import './index.style';

new Vue({ // eslint-disable-line no-new
  el: '#app',
  render: (f) => f(HomeComponent),
});
