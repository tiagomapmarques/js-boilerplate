
declare module 'services' {
  interface HelperServiceType {
    getJson: <T>(filename: string, defaultResponse: T) => Promise<T>;
  }

  export const HelperService: HelperServiceType;
}
