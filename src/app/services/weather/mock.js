
const mockCity = id => ({
  Key: id,
  LocalizedName: `CityName${id}`,
  AdministrativeArea: {
    LocalizedName: `DistrictName${id * 2}`,
  },
  Country: {
    LocalizedName: 'CountryName',
  },
});

const mockForecast = day => ({
  Date: `2017-01-${(`0${day}`).slice(-2)}`,
  Day: {
    Icon: day * 4,
    IconPhrase: `My Condition ${day}`,
  },
  Temperature: {
    Minimum: {
      Value: day * 10,
      Unit: 'F',
    },
    Maximum: {
      Value: (day * 10) + 1,
      Unit: 'F',
    },
  },
});

export const WeatherServiceMock = {
  getCitiesByName: () => new Promise(resolve => resolve([0, 1, 2, 3, 4].map(id => mockCity(id)))),

  getFiveDayForecast: () => new Promise(resolve => resolve({
    DailyForecasts: [1, 2, 3, 4, 5].map(day => mockForecast(day)),
  })),
};
