
export const StringService = {
  removeVersionPatch: version => version.split('.').filter((_, index) => index < 2).join('.'),
};
