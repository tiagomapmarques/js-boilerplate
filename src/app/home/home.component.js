import { Logger } from './logger';

export class HomeComponent {
  static DATA_URL = '/assets/sample.json';
  static FETCH_RESPONSE_ERROR = 'Fetch response not ok';
  appId;

  constructor(id) {
    this.appId = id;
    this.buildPage = this.buildPage.bind(this);
  }

  run() {
    this.getSampleData()
      .then(this.buildPage)
      .catch(Logger.catch);
  }

  getSampleData() {
    return fetch(HomeComponent.DATA_URL)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(HomeComponent.FETCH_RESPONSE_ERROR);
      })
      .catch(Logger.catch);
  }

  buildPage(data) {
    const element = document.getElementById(this.appId);
    if (element) {
      element.innerHTML = data.page;
    }
    console.log(data.console); // eslint-disable-line no-console
  }
}
