import styles from './home.style';

const DATA_URL = `${VARIABLES.SERVICES.ASSETS}sample.json`;
const EMPTY_DATA = {
  text: '',
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
  environment = VARIABLES.ENVIRONMENT;
  version = VARIABLES.VERSION;
  appId;
  text;

  constructor(id) {
    this.appId = id;
    this.text = '';
    this.buildPage = this.buildPage.bind(this);
  }

  init() {
    this.buildPage(EMPTY_DATA);
    return getSampleData().then(this.buildPage);
  }

  buildPage(data) {
    this.text = data.text || '';
    const element = document.getElementById(this.appId);
    if (element) {
      element.innerHTML = this.getText() + this.getFooter();
    }
  }

  getText() {
    return this.text ? `<div class="${styles.page}">${VARIABLES.TITLE} says ${this.text}!</div>` : '';
  }

  getFooter() {
    return `<div class="${styles.footer}">v${this.version} (${this.environment})</div>`;
  }
}
