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

const writeToDocumentById = (id, contentText) => {
  const element = document.getElementById(id);
  if (element) {
    element.innerHTML = contentText;
  }
  return element && element.innerHTML;
};

export class HomeComponent {
  environment = VARIABLES.ENVIRONMENT;

  version = VARIABLES.VERSION;

  rootId = VARIABLES.ROOTID;

  title = VARIABLES.TITLE;

  text;

  constructor() {
    this.text = '';
    this.handleData = this.handleData.bind(this);
  }

  init() {
    return getSampleData().then(this.handleData);
  }

  handleData({ text }) {
    this.text = text;
    this.render();
  }

  render() {
    return writeToDocumentById(this.rootId, `
      <div>
        ${this.text ? `<div class="${styles.content}">${this.title} says ${this.text}!</div>` : ''}
        <div class="${styles.footer}">v${this.version}-${this.environment}</div>
      </div>
    `);
  }
}
