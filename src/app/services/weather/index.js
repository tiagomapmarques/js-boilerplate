import { RequestService } from '../request';
import { WeatherServiceMock } from './mock';

export const WeatherService = {
  getCitiesByName: (cityName, useMock = false) => {
    if (!useMock) {
      return RequestService.getJson(`${VARIABLES.SERVICES.WEATHER}locations/v1/cities/autocomplete?apikey=${VARIABLES.KEYS.WEATHER}&q=${cityName}`);
    }
    return WeatherServiceMock.getCitiesByName();
  },

  getFiveDayForecast: (cityKey, useMock = false) => {
    if (!useMock) {
      return RequestService.getJson(`${VARIABLES.SERVICES.WEATHER}forecasts/v1/daily/5day/${cityKey}?apikey=${VARIABLES.KEYS.WEATHER}`);
    }
    return WeatherServiceMock.getFiveDayForecast();
  },
};
