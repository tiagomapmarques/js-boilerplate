import { faviconConfig } from './favicon';
import { pageConfig } from './page';

const getManifestConfig = minify => ({
  path: '../',
  pretty: minify,
  name: pageConfig.title,
  description: pageConfig.description,
  lang: pageConfig.locale,
  icons: faviconConfig.location,
});

export const manifest = {
  pretty: getManifestConfig(true),
  minified: getManifestConfig(false),
};
