import { HelperService } from 'services';

import style from './home.style';

const EMPTY_DATA = { text: '' };

export class HomeComponent {
  constructor(parentId) {
    this.parentId = parentId;
    this.text = '';
    this.handleData = this.handleData.bind(this);
  }

  create() {
    return HelperService.getJson('sample', EMPTY_DATA).then(this.handleData);
  }

  handleData({ text }) {
    this.text = text;
    this.render();
  }

  render() {
    return HelperService.writeToDocumentById(this.parentId, `
      <div>
        ${this.text
          ? `
            <div class="${style.content}">
              ${VARIABLES.TITLE} says ${this.text}!
            </div>`
          : ''
        }
        <div class="${style.footer}">
          v${VARIABLES.VERSION}-${VARIABLES.ENVIRONMENT}
        </div>
      </div>
    `);
  }
}
