
export interface DefaultPluginOptions {
  [key: string]: string | DefaultPluginOptions;
}

export const envSetup = (environment: string): DefaultPluginOptions => ({
  'process.env': {
    NODE_ENV: `'${environment}'`,
  },
});
