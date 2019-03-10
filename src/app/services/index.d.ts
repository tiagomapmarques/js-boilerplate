
declare module 'services' {
  interface HelperServiceType {
    getJson: <T>(filename: string, defaultResponse: T) => Promise<T>;
    createElement: (tagName: string, content?: string | { toString: () => string }) => HTMLElement;
    createStyleElement: (style: string | { toString: () => string }) => HTMLStyleElement;
  }

  export const HelperService: HelperServiceType;
}
