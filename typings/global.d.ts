
// BASE DEFINITIONS

declare interface IndexObject<T> {
  [key: string]: T;
}

declare interface IndexObjectAny extends IndexObject<any> {}

declare module '*.style' {
  interface BiotopeBuildStyle extends IndexObject<string> {
    // FIXME: toString should be specified as described in the comment beside it, but due to the
    // definition of IndexObject, the value of all keys should be of the same type (string).
    toString: any; // should be of type "() => string"
  }
  const style: BiotopeBuildStyle;
  export = style;
}

declare module '*.svg' {
  const content: string;
  export = content;
}

// FIXME: Typescript limitation on importing deconstructed json files
// declare module '*.json' {
//   const content: IndexObjectAny;
//   export = content;
// }
declare module '*.json';

// ENVIRONMENT VARIABLES DEFINITION

declare interface EnvironmentVariablesBase extends IndexObject<string|EnvironmentVariablesBase> {}

declare interface DefaultsEnvironmentVariables extends EnvironmentVariablesBase {
  LOCALE: string;
  LOCALE_SHORT: string;
}

declare interface ServicesEnvironmentVariables extends EnvironmentVariablesBase {
  ASSETS: string;
}

declare interface EnvironmentVariables extends EnvironmentVariablesBase {
  ENVIRONMENT: string;
  VERSION: string;
  ROOTID: string;
  TITLE: string;
  DEFAULTS: DefaultsEnvironmentVariables;
  SERVICES: ServicesEnvironmentVariables;
}

declare const VARIABLES: EnvironmentVariables;
