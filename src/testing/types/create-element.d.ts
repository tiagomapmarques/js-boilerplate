
declare interface TestNodeAttributes {
  id: string;
  [key: string]: any;
}

declare type TestNode = (() => HTMLElement) | HTMLElement;

declare function createElement(parentNode: TestNode, tagName: string, attributes: TestNodeAttributes): void;
