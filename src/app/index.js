import 'browser-polyfills';
import { HomeComponent } from 'app/home';

import './index.style';

const app = new HomeComponent('app');
app.run();
