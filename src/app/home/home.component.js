
export class HomeComponent {
  constructor(id) {
    this.appId = id;
    this.build = this.build.bind(this);
  }

  run() {
    this.getSampleData().then(this.build);
  }

  getSampleData() {
    return fetch('/assets/sample.json').then((data) => data.json());
  }

  build(data) {
    document.getElementById(this.appId).innerHTML = data.page;
    console.log(data.console); // eslint-disable-line no-console
  }
}
