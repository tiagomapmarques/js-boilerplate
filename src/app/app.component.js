import jquery from 'jquery';

export class AppComponent {
  constructor(id) {
    this.appId = id;
  }

  run() {
    this.getSampleData()
      .then((data) => this.build(data));
  }

  getSampleData() {
    return fetch('/assets/sample.json')
      .then((data) => data.json());
  }

  build(data) {
    jquery(`#${this.appId}`).html(data.page);
    console.log(data.console); // eslint-disable-line no-console
  }
}
