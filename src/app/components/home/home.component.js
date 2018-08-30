import BioElement from '@biotope/element';

import { HelperService } from 'services';

import style from './home.style';

const EMPTY_DATA = { text: '' };

export class HomeComponent extends BioElement {
  static componentName = 'home-component';

  constructor() {
    super();
    this.setState({
      text: '',
    });
  }

  created() {
    return HelperService.getJson('sample', EMPTY_DATA).then(this.handleData);
  }

  handleData({ text }) {
    this.setState({ text });
  }

  render() {
    const { text } = this.state;
    return this.html`
      <div>
        ${text
          ? this.wire`
            <div class="${style.locals.content}">
              ${VARIABLES.TITLE} says ${text}!
            </div>`
          : ''
        }
        <div class="${style.locals.footer}">
          v${VARIABLES.VERSION}-${VARIABLES.ENVIRONMENT}
        </div>
      </div>
      ${HelperService.createStyleElement(style)}
    `;
  }
}
