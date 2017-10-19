
export class HomeComponent {
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
    document.getElementById(this.appId).innerHTML = data.page;
    console.log(data.console); // eslint-disable-line no-console
  }
}
