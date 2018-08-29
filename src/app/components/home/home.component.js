import { HelperService } from 'services';

import style from './home.style';

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

  create() {
    return HelperService.getJson('sample', { text: '' }).then(this.handleData);
  }

  handleData({ text }) {
    this.text = text;
    this.render();
  }

  render() {
    return HelperService.writeToDocumentById(this.rootId, `
      <div>
        ${this.text ? `<div class="${style.content}">${this.title} says ${this.text}!</div>` : ''}
        <div class="${style.footer}">v${this.version}-${this.environment}</div>
      </div>
    `);
  }
}
