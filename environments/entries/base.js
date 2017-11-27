
const execute = (module, defaultInit = 'init') => {
  if (typeof module === 'function') {
    module();
  } else if (typeof module[defaultInit] === 'function') {
    module[defaultInit]();
  } else {
    throw new Error(`Entry does not export function nor object with "${defaultInit}" function`);
  }
};

export const loadEntry = entry => document.addEventListener('DOMContentLoaded', () => {
  if (entry.default) {
    execute(entry.default);
  } else {
    Object.keys(entry).forEach(moduleKey => entry[moduleKey] && execute(entry[moduleKey]));
  }
});
