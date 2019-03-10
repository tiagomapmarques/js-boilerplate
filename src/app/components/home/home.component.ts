import Vue from 'vue';
import { Component, Prop, Provide } from 'vue-property-decorator';

import { HelperService } from 'services';

import * as template from './home.template';
import * as style from './home.style';

export interface SampleData {
  text: string;
}

const EMPTY_DATA: SampleData = { text: '' };

@Component({ ...template.default })
export class HomeComponent extends Vue {
  @Prop({ default: PROJECT.ROOTID }) public readonly parentId!: string;

  @Provide() public style = style;

  @Provide() public text = '';

  @Provide() public title = PROJECT.TITLE;

  @Provide() public version = `v${PROJECT.VERSION}-${ENVIRONMENT}`;

  public created(): void {
    HelperService.getJson('sample', EMPTY_DATA).then(this.handleData);
  }

  public handleData({ text }: SampleData): void {
    this.text = text;
  }
}
