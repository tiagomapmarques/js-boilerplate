import { page } from '../../config';
import { faviconConfig } from './favicon';

const getManifestConfig = minify => ({
  path: '../',
  pretty: minify,
  icons: faviconConfig.location,
  name: page.title,
  description: page.description,
  lang: page.locale,
});

export const manifest = {
  pretty: getManifestConfig(true),
  minified: getManifestConfig(false),
};
