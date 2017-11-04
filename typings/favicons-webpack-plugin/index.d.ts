
declare module 'favicons-webpack-plugin' {
  import * as webpack from 'webpack';

  export = FaviconsWebpackPlugin;

  class FaviconsWebpackPlugin extends webpack.Plugin {
    constructor(options?: FaviconsWebpackPlugin.Configuration);
  }

  namespace FaviconsWebpackPlugin {
    type VariantName = 'favicons' | 'android' | 'appleIcon' | 'appleStartup' | 'coast' | 'firefox' | 'opengraph' | 'twitter' | 'yandex' | 'windows';

    interface Variants {
      android?: boolean;
      appleIcon?: boolean;
      appleStartup?: boolean;
      coast?: boolean;
      favicons?: boolean;
      firefox?: boolean;
      opengraph?: boolean;
      twitter?: boolean;
      yandex?: boolean;
      windows?: boolean;
    }

    interface Configuration {
      logo?: string;
      prefix?: string;
      emitStats?: boolean;
      statsFilename?: string;
      persistentCache?: boolean;
      inject?: boolean;
      background?: string;
      title?: string;
      icons?: Variants;
    }
  }
}
