import Component from '@biotope/element';

import { HelperService } from 'services';

import * as style from './home.style';

export interface SampleData {
  text: string;
}

const EMPTY_DATA: SampleData = { text: '' };

export interface HomeComponentProps {
  basePath: string;
}

interface HomeComponentState {
  text: string;
}

export class HomeComponent extends Component<HomeComponentProps, HomeComponentState> {
  public static componentName = 'home-component';

  public constructor() {
    super();
    this.setState({ text: '' });
  }

  public created(): Promise<void> {
    return HelperService.getJson('sample', EMPTY_DATA).then(this.handleData);
  }

  public render(): string {
    const { text } = this.state;
    return this.html`
      <div>
        ${text ? this.wire()`
          <div class="${style.content}">
            ${PROJECT.TITLE} says ${text}!
          </div>` : ''}
        <div class="${style.footer}">
          v${PROJECT.VERSION}-${ENVIRONMENT}
        </div>
      </div>
      ${HelperService.createStyleElement(style)}
    `;
  }

  private handleData({ text }: SampleData): void {
    this.setState({ text });
  }
}
