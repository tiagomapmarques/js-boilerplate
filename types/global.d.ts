
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare type RecordAny = Record<string, any>;

declare module '*.style' {
  type ImportedStyle = Record<string, string>;
  interface ToStringObject {
    toString: () => string;
  }

  const style: ImportedStyle & ToStringObject;
  export = style;
}

declare module '*.svg' {
  const content: string;
  // eslint-disable-next-line import/no-default-export
  export default content;
}

declare module '*.json' {
  const content: RecordAny;
  export = content;
}

declare module '*.template'{
  import Vue from 'vue';

  const template: Vue;
  // eslint-disable-next-line import/no-default-export
  export default template;
}

// ENVIRONMENT VARIABLES DEFINITION

interface ProjectEnvironmentVariables {
  VERSION: string;
  ROOTID: string;
  TITLE: string;
}

interface DefaultsEnvironmentVariables {
  LOCALE: string;
  LOCALE_SHORT: string;
}

interface ServicesEnvironmentVariables {
  ASSETS: string;
}

declare const ENVIRONMENT: string;
declare const PROJECT: ProjectEnvironmentVariables;
declare const DEFAULTS: DefaultsEnvironmentVariables;
declare const SERVICES: ServicesEnvironmentVariables;
