import { HelperService } from 'services';

import * as style from './home.style';

export interface SampleData {
  text: string;
}

const EMPTY_DATA: SampleData = { text: '' };

export class HomeComponent {
  private parentId = VARIABLES.ROOTID;

  private text = '';

  public constructor() {
    this.handleData = this.handleData.bind(this);
  }

  public create() {
    return HelperService.getJson('sample', EMPTY_DATA).then(this.handleData);
  }

  public render() {
    return HelperService.writeToDocumentById(this.parentId, `
      <div id="${this.parentId}">
        ${this.getContent()}
        <div class="${style.footer}">
          v${VARIABLES.VERSION}-${VARIABLES.ENVIRONMENT}
        </div>
      </div>
    `);
  }

  private handleData({ text }: SampleData) {
    this.text = text;
    this.render();
  }

  private getContent() {
    return this.text
      ? `
        <div class="${style.content}">
          ${VARIABLES.TITLE} says ${this.text}!
        </div>`
      : '';
  }
}
