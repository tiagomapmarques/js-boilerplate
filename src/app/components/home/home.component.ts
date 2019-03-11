import Component, { HTMLFragment } from '@biotope/element';

import { HelperService } from 'services';

import * as style from './home.style';

export interface SampleData {
  text: string;
}

interface HomeComponentState {
  text: string;
}

const EMPTY_DATA: SampleData = { text: '' };

export class HomeComponent extends Component<object, HomeComponentState> {
  public static componentName = 'home-component';

  public readonly defaultState: HomeComponentState = EMPTY_DATA;

  public connectedCallback(): void {
    HelperService.getJson('sample', EMPTY_DATA).then(this.handleData.bind(this));
  }

  public render(): HTMLFragment {
    const { text } = this.state;
    return this.html`
      <div>
        ${text ? this.html`
          <div class=${style.content}>
            ${PROJECT.TITLE} says ${text}!
          </div>` : null}
        <div class=${style.footer}>
          v${PROJECT.VERSION}-${ENVIRONMENT}
        </div>
      </div>
      ${this.createStyle(style)}
    `;
  }

  private handleData({ text }: SampleData): void {
    this.setState({ text });
  }
}

HomeComponent.register();
