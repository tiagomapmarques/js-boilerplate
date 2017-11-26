import React from 'react';

const DATA_URL = `${ENVIRONMENT.SERVICES.ASSETS}sample.json`;
const EMPTY_DATA = {
  console: '',
  page: '',
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
    this.state = {
      pageData: '',
    };
    this.buildPage = this.buildPage.bind(this);
  }

  componentDidMount() {
    return getSampleData().then(this.buildPage);
  }

  buildPage(data) {
    this.setState({ pageData: data.page });
    if (data.console) {
      // eslint-disable-next-line no-console
      console.log(data.console);
    }
  }

  render() {
    return (
      <div>{ this.state.pageData }</div>
    );
  }
}
