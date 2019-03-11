import * as React from 'react';

import { HelperService } from 'services';

import * as style from './home.style';

export interface SampleData {
  text: string;
}

const EMPTY_DATA: SampleData = { text: '' };

export interface HomeComponentState {
  text: string;
}

export class HomeComponent extends React.Component<object, HomeComponentState> {
  public constructor(props: object) {
    super(props);
    this.handleData = this.handleData.bind(this);
    this.state = {
      text: '',
    };
  }

  public componentDidMount(): void {
    HelperService.getJson('sample', EMPTY_DATA).then(this.handleData);
  }

  public render(): JSX.Element {
    const { text } = this.state;
    return (
      <>
        {!!text && (
          <div className={style.content}>
            {`${PROJECT.TITLE} says ${text}!`}
          </div>
        )}
        <div className={style.footer}>
          {`v${PROJECT.VERSION}-${ENVIRONMENT}`}
        </div>
      </>
    );
  }

  private handleData({ text }: SampleData): void {
    this.setState({ text });
  }
}
