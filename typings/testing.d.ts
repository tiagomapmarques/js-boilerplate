// eslint-disable-next-line typescript/no-triple-slash-reference,spaced-comment
/// <reference path="./global.d.ts" />

interface TestConsole extends Console, jest.MockInstance<Console> {}

interface TestFetchArguments {
  status?: number;
  statusText?: string;
  url?: string;
  headers?: {};
}

type FetchType = typeof fetch;
type FetchMockType = FetchType & jest.MockInstance<FetchType>;
interface TestFetch extends FetchMockType {
  // adapted from /node_modules/jest-fetch-mock/src/index.d.ts
  mockResponse(body: string, init?: TestFetchArguments): FetchType;
  mockResponseOnce(body: string, init?: TestFetchArguments): FetchType;
  once(body: string, init?: TestFetchArguments): FetchType;
  mockResponses(...responses: ([string] | [string, TestFetchArguments])[]): FetchType;
  mockReject(error?: Error): FetchType;
  mockRejectOnce(error?: Error): FetchType;
  resetMocks(): void;
}

interface TestImportsInterface {
  get: () => string[];
  add: (moduleName: string) => void;
}

declare function mockStyle(styleModule: IndexObject<string>): IndexObject<string>;

// eslint-disable-next-line no-unused-vars
declare const TestImports: TestImportsInterface;

declare interface TestGlobal extends NodeJS.Global {
  VARIABLES: EnvironmentVariables;
  fetch: TestFetch;
  console: TestConsole;
  mockStyle: typeof mockStyle;
  TestImports: TestImportsInterface;
}
