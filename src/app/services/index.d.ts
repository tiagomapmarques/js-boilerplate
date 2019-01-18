
declare module 'services' {
  interface HelperServiceType {
    getJson: <T>(filename: string, defaultResponse: T) => Promise<T>;
    writeToDocumentById: (id: string, contentText: string, replace?: boolean) => HTMLElement | null;
  }

  export const HelperService: HelperServiceType;
}
