import Vue from 'vue';
import { Component, Prop, Provide } from 'vue-property-decorator';

import { HelperService } from 'services';

import * as style from './home.style';

export interface SampleData {
  text: string;
}

const EMPTY_DATA: SampleData = { text: '' };

@Component
export class HomeComponent extends Vue {
  @Prop({ default: PROJECT.ROOTID }) public readonly parentId!: string;

  @Provide() public text = '';

  public created(): void {
    HelperService.getJson('sample', EMPTY_DATA).then(this.handleData);
  }

  public handleData({ text }: SampleData): void {
    this.text = text;
  }

  public render(): JSX.Element {
    return (
      <div id={this.parentId}>
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
}
