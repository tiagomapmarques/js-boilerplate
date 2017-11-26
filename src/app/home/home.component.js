import React from 'react';

import styles from './home.style';

const DATA_URL = `${VARIABLES.SERVICES.ASSETS}sample.json`;
const EMPTY_DATA = {
  text: '',
};

const getSampleData = () => fetch(DATA_URL)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error();
  })
  .catch(() => EMPTY_DATA);

export class HomeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.handleData = this.handleData.bind(this);

    this.state = {
      environment: VARIABLES.ENVIRONMENT,
      version: VARIABLES.VERSION,
      title: VARIABLES.TITLE,
      text: '',
    };
  }

  componentDidMount() {
    getSampleData().then(this.handleData);
  }

  handleData({ text }) {
    this.setState({ text });
  }

  buildContent() {
    const { text, title } = this.state;
    return <div className={styles.content}>{title} says {text}!</div>;
  }

  buildFooter() {
    const { environment, version } = this.state;
    return <div className={styles.footer}>v{version}-{environment}</div>;
  }

  render() {
    return (
      <div>
        {!!this.state.text && this.buildContent()}
        {this.buildFooter()}
      </div>
    );
  }
}
