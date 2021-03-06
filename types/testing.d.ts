// eslint-disable-next-line @typescript-eslint/triple-slash-reference,spaced-comment
/// <reference path="./global.d.ts" />

interface MockConsole extends Console, jest.Mock {}

interface MockFetchArguments {
  status?: number;
  statusText?: string;
  url?: string;
  headers?: {};
}

type FetchType = typeof fetch;
type FetchMockType = FetchType & jest.Mock;
interface MockFetch extends FetchMockType {
  // adapted from /node_modules/jest-fetch-mock/src/index.d.ts
  mockResponse(body: string, init?: MockFetchArguments): FetchType;
  mockResponseOnce(body: string, init?: MockFetchArguments): FetchType;
  once(body: string, init?: MockFetchArguments): FetchType;
  mockResponses(...responses: ([string] | [string, MockFetchArguments])[]): FetchType;
  mockReject(error?: Error): FetchType;
  mockRejectOnce(error?: Error): FetchType;
  resetMocks(): void;
}

interface MockImportsInterface {
  get: () => string[];
  add: (moduleName: string) => void;
}

declare function mockStyle(styleModule: Record<string, string>): Record<string, string>;

// eslint-disable-next-line no-unused-vars
declare const MockImports: MockImportsInterface;

declare interface MockGlobal extends NodeJS.Global {
  fetch: MockFetch;
  console: MockConsole;
  mockStyle: typeof mockStyle;
  MockImports: MockImportsInterface;
}
