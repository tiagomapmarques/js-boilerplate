
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
    return fetch(HomeComponent.DATA_URL)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error();
      })
      .catch(() => HomeComponent.EMPTY_DATA);
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
