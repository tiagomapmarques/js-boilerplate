import { faviconConfig } from './favicon';
import { pageConfig } from './page';

const getManifestConfig = minify => ({
  path: '../',
  pretty: minify,
  icons: faviconConfig.location,
  name: pageConfig.title,
  description: pageConfig.description,
  lang: pageConfig.locale,
});

export const manifest = {
  pretty: getManifestConfig(true),
  minified: getManifestConfig(false),
};
