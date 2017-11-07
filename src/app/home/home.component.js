
export class HomeComponent {
  static DATA_URL = '/assets/sample.json';
  static EMPTY_DATA = {
    console: '',
    page: '',
  };
  appId;

  constructor(id) {
    this.appId = id;
    this.buildPage = this.buildPage.bind(this);
  }

  init() {
    return this.getSampleData().then(this.buildPage);
  }

  getSampleData() {
    return this.fetchData()
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error();
      })
      .catch(() => HomeComponent.EMPTY_DATA);
  }

  fetchData() {
    try {
      return fetch(HomeComponent.DATA_URL);
    } catch (error) {
      return new Promise((resolve, reject) => reject(error));
    }
  }

  buildPage(data) {
    const element = document.getElementById(this.appId);
    if (element) {
      element.innerHTML = data.page;
    }
    if (data.console) {
      console.log(data.console); // eslint-disable-line no-console
    }
  }
}
