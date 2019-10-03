import { HelperService } from 'services';

import * as style from './home.style';

export interface SampleData {
  text: string;
}

const EMPTY_DATA: SampleData = { text: '' };

export class HomeComponent {
  private text = '';

  public constructor() {
    this.handleData = this.handleData.bind(this);
  }

  public create(): Promise<void> {
    return HelperService.getJson('sample', EMPTY_DATA).then(this.handleData);
  }

  public render(): HTMLElement {
    return HelperService.naiveRender(`#${PROJECT.ROOTID}`, `
      ${this.text ? `
        <div class="${style.content}">
          ${PROJECT.TITLE} says ${this.text}!
        </div>` : ''}
      <div class="${style.footer}">
        ${`v${PROJECT.VERSION}-${ENVIRONMENT}`}
      </div>
    `);
  }

  private handleData({ text }: SampleData): void {
    this.text = text;
    this.render();
  }
}
