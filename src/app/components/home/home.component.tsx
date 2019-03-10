import Vue from 'vue';
import { Component } from 'vue-property-decorator';

import { HelperService } from 'services';

import * as style from './home.style';

export interface SampleData {
  text: string;
}

const EMPTY_DATA: SampleData = { text: '' };

@Component
export class HomeComponent extends Vue {
  private text = '';

  public created(): void {
    HelperService.getJson('sample', EMPTY_DATA).then(this.handleData);
  }

  public render(): JSX.Element {
    return (
      <div id={PROJECT.ROOTID}>
        {!!this.text && (
          <div class={style.content}>
            {PROJECT.TITLE} says {this.text}!
          </div>
        )}
        <div class={style.footer}>
          v{PROJECT.VERSION}-{ENVIRONMENT}
        </div>
      </div>
    );
  }

  private handleData({ text }: SampleData): void {
    this.text = text;
  }
}
