
declare type FetchFunction = (input: RequestInfo, init?: RequestInit) => Promise<Response>;

interface MockFetchArguments {
  body: string;
  init?: Object;
}

declare interface MockFetch extends FetchFunction, jest.Mock {
  mockResponse: (body: string, init?: Object) => void;
  mockResponseOnce: (body: string, init?: Object) => void;
  mockResponses: (responses: MockFetchArguments[]) => void;
  mockReject: () => void;
  mockRejectOnce: () => void;
  resetMocks: () => void;
}

declare const _fetch: MockFetch;
