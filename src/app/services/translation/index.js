import { RequestService } from '../request';

export const TranslationService = {
  getLocale: locale => RequestService.getLocale(`${locale}.json`),

  translate: (data, translationCode) => translationCode.split('.')
    .reduce((current, newKey) => current && current[newKey], data) || translationCode,

  componentFunctions: {
    translate(translationCode) {
      return TranslationService.translate(this.localeData, translationCode);
    },
  },
};
