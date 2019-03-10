import Vue from 'vue';
import { Component } from 'vue-property-decorator';

import { HelperService } from 'services';

import * as template from './home.template';
import * as style from './home.style';

export interface SampleData {
  text: string;
}

const EMPTY_DATA: SampleData = { text: '' };

@Component({ ...template.default })
export class HomeComponent extends Vue {
  public readonly style = style;

  public readonly parentId = PROJECT.ROOTID;

  public readonly title = PROJECT.TITLE;

  public readonly version = `v${PROJECT.VERSION}-${ENVIRONMENT}`;

  public text = '';

  public created(): void {
    HelperService.getJson('sample', EMPTY_DATA).then(this.handleData);
  }

  private handleData({ text }: SampleData): void {
    this.text = text;
  }
}
