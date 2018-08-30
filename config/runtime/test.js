
const localeData = {
  states: {
    loading: 'A carregar...',
    error: 'Ocorreu um erro.',
  },
  instructions: {
    refresh: 'Por favor atualize a página...',
    autocomplete: {
      label: 'Procure uma cidade',
    },
  },
};

export const env = {
  ENVIRONMENT: 'test',
  VERSION: '0.0.0-test',
  ROOTID: 'mock-root-id',
  TITLE: 'Mock Title',
  DEFAULTS: {
    LOCALE: 'pt_PT',
    LOCALE_SHORT: 'pt',
    LOCALE_DATA: localeData,
    METRIC: false,
  },
  KEYS: {
    WEATHER: 'mock-weather-api-key',
  },
  SERVICES: {
    ASSETS: '/mock-assets/',
    LOCALE: '/mock-locale/',
    WEATHER: 'http://mock-weather-api.com/',
  },
};
