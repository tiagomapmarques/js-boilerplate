// tslint:disable-next-line:no-reference
/// <reference path="./global.d.ts" />

interface TestConsole extends Console, jest.MockInstance<Console> {}

interface TestFetchArguments {
  status?: number;
  statusText?: string;
  url?: string;
  headers?: Object;
}

type FetchType = typeof fetch;
type FetchMockType = FetchType & jest.MockInstance<FetchType>;
interface TestFetch extends FetchMockType {
  // adapted from /node_modules/jest-fetch-mock/src/index.d.ts
  mockResponse(body: string, init?: TestFetchArguments): FetchType;
  mockResponseOnce(body: string, init?: TestFetchArguments): FetchType;
  once(body: string, init?: TestFetchArguments): FetchType;
  mockResponses(...responses : Array<[string] | [string, TestFetchArguments]>): FetchType;
  mockReject(error?: Error): FetchType;
  mockRejectOnce(error?: Error): FetchType;
  resetMocks(): void;
}

interface TestImportsInterface {
  get: () => string[];
  add: (moduleName: string) => void;
}

declare function mockStyle(styleModule: IndexObject<string>): IndexObject<string>;

declare const TestImports: TestImportsInterface;

declare interface TestGlobal extends NodeJS.Global {
  VARIABLES: EnvironmentVariables;
  fetch: TestFetch;
  console: TestConsole;
  mockStyle: typeof mockStyle;
  TestImports: TestImportsInterface;
}