import moment from 'moment';

import template from './daily-forecasts.template';
import styles from './daily-forecasts.style';

export const DailyForecastsComponent = {
  ...template,

  props: ['forecastList'],

  data() {
    return {
      styles,
    };
  },

  computed: {
    forecastListMapped() {
      return this.forecastList.map(forecast => ({
        title: moment(new Date(forecast.Date)).format('MMM Do'),
        icon: `https://developer.accuweather.com/sites/default/files/${(`0${forecast.Day.Icon}`).slice(-2)}-s.png`,
        alt: forecast.Day.IconPhrase,
        metric: forecast.Temperature.Minimum.Unit,
        min: forecast.Temperature.Minimum.Value,
        max: forecast.Temperature.Maximum.Value,
      }));
    },
  },
};
