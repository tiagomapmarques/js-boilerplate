import 'babel-polyfill';
import 'whatwg-fetch';

import { HomeComponent } from 'app/home';

import './index.style';

const app = new HomeComponent('app');
app.run();
