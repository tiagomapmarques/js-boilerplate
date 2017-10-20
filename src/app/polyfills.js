import Promise from 'promise-polyfill';
import setImmediate from 'setasap';

if (!window.Promise) {
  window.Promise = Promise;
  Promise._immediateFn = setImmediate;
}

// NOTE: whatwg-fetch already imports fetch if the browser does not support it natively
