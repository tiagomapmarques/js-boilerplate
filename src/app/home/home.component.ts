
export interface SampleData {
  console: string;
  page: string;
}

export interface MockHomeComponent {
  appId: string;
  run: jest.Mock;
  getSampleData: jest.Mock;
  buildPage: jest.Mock;
}

export class HomeComponent {
  private static DATA_URL = '/assets/sample.json';
  private static EMPTY_DATA: SampleData = {
    console: '',
    page: '',
  };
  private appId: string;

  constructor(id: string) {
    this.appId = id;
    this.buildPage = this.buildPage.bind(this);
  }

  public init() {
    return this.getSampleData().then(this.buildPage);
  }

  private getSampleData(): Promise<SampleData> {
    return this.fetchData()
      .then((response: Response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error();
      })
      .catch(() => HomeComponent.EMPTY_DATA);
  }

  private fetchData(): Promise<Response> {
    try {
      return fetch(HomeComponent.DATA_URL);
    } catch (error) {
      return new Promise((_, reject) => reject(error));
    }
  }

  private buildPage(data: SampleData) {
    const element = document.getElementById(this.appId);
    if (element) {
      element.innerHTML = data.page;
    }
    if (data.console) {
      console.log(data.console); // eslint-disable-line no-console
    }
  }
}
