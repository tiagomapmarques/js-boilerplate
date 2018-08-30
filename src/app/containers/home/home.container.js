import { mappers } from 'states';
import { PageContainerComponent } from 'modules/ui';
import { AutocompleteComponent, DailyForecastsComponent } from 'modules/weather';

import { BaseContainer } from 'containers/base.container';

import template from './home.template';
import styles from './home.style';

export const HomeContainer = {
  ...BaseContainer,
  ...template,

  components: {
    'page-container': PageContainerComponent,
    autocomplete: AutocompleteComponent,
    'daily-forecasts': DailyForecastsComponent,
  },

  data() {
    return {
      styles,
    };
  },

  computed: {
    ...mappers.locale.state,
    ...mappers.locale.getters,
    ...mappers.metric.state,
    ...mappers.metric.getters,
    ...mappers.forecast.state,
    ...mappers.forecast.getters,
    ...mappers.mockapi.state,
    ...mappers.mockapi.getters,

    forecastList() {
      return (this.forecastData && this.forecastData.DailyForecasts) || [];
    },
  },

  methods: {
    ...BaseContainer.methods,
    ...mappers.locale.actions,
    ...mappers.metric.actions,
    ...mappers.forecast.actions,
    ...mappers.mockapi.actions,

    handleChange(cityKey) {
      this.forecastGet({
        cityKey,
        useMockApi: this.mockapiData,
      });
    },
  },
};
