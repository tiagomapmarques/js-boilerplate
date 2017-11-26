import 'browser-polyfills';
import React from 'react';
import ReactDOM from 'react-dom';

import { HomeComponent } from 'app/home';

import './index.style';

ReactDOM.render(
  <HomeComponent />,
  document.getElementById('app'),
);
