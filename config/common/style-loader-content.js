
const loaderDocument = global.document;
// eslint-disable-next-line import/no-dynamic-require,no-undef
let style = require(__STYLE__);

if (typeof style === 'string') {
  style = [[module.id, style, '']];
}

const content = (style && style[0] && style[0][1]) || '';
// NOTE: allow calling hasOwnProperty due to browser compatibilities
// eslint-disable-next-line no-prototype-builtins
const cssInJavacript = style.hasOwnProperty('toString');
const isCustomElement = style.toString().indexOf(':host') >= 0;
const autoApplyStyle = cssInJavacript && !isCustomElement;

if (autoApplyStyle) {
  const element = loaderDocument.createElement('style');
  element.innerHTML = content;
  loaderDocument.head.appendChild(element);
}

module.exports = {
  ...(style.locals || style),
  toString: () => (!autoApplyStyle ? content : ''),
};
