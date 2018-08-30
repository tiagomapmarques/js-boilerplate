import { environments } from '../environments';
import { pageConfig, project } from '../settings';
import { localeData } from './common';

export const env = {
  ENVIRONMENT: environments.prod,
  VERSION: project.version,
  ROOTID: pageConfig.rootId,
  TITLE: pageConfig.title,
  DEFAULTS: {
    LOCALE: pageConfig.locale,
    LOCALE_SHORT: pageConfig.localeShort,
    LOCALE_DATA: localeData,
    METRIC: false,
  },
  KEYS: {
    WEATHER: '9TcUiJqD6odyFc07UXX26Fow6aSwYjpX',
  },
  SERVICES: {
    ASSETS: '/assets/',
    LOCALE: '/locale/',
    WEATHER: 'http://dataservice.accuweather.com/',
  },
};
