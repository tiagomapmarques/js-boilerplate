
const DATA_URL = `${ENVIRONMENT.SERVICES.ASSETS}sample.json`;
const EMPTY_DATA = {
  console: '',
  page: '',
};

const getSampleData = () => fetch(DATA_URL)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error();
  })
  .catch(() => EMPTY_DATA);

export class HomeComponent {
  appId;

  constructor(id) {
    this.appId = id;
    this.buildPage = this.buildPage.bind(this);
  }

  init() {
    return getSampleData().then(this.buildPage);
  }

  buildPage(data) {
    const element = document.getElementById(this.appId);
    if (element) {
      element.innerHTML = data.page;
    }
    if (data.console) {
      // eslint-disable-next-line no-console
      console.log(data.console);
    }
  }
}
