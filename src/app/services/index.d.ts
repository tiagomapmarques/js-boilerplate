
declare module 'services' {
  interface HelperServiceType {
    getJson: <T>(filename: string, defaultResponse: T) => Promise<T>;
    naiveRender: (id: string, contentText: string, replaceParent?: boolean) => HTMLElement;
  }

  export const HelperService: HelperServiceType;
}
