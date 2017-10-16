import 'babel-polyfill';
import 'whatwg-fetch';

import { AppComponent } from './app.component';

import './index.style';

const app = new AppComponent('app');
app.run();
