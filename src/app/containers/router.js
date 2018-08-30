import { HomeContainer } from 'containers/home';
import { AboutContainer } from 'containers/about';
import template from './router.template';

const props = route => ({ route });

export const render = vueRender => vueRender(template);

export const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeContainer,
    props,
  },
  {
    path: '/about',
    name: 'about',
    component: AboutContainer,
    props,
  },
];
