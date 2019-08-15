
var loaderDocument = global.document;
var style = require(__STYLE__);

if (typeof style === 'string') {
  style = [[module.id, style, '']];
}

var content = (style && style[0] && style[0][1]) || '';
var cssInJavacript = style.hasOwnProperty('toString');
var isCustomElement = style.toString().indexOf(':host') >= 0;
var autoApplyStyle = cssInJavacript && !isCustomElement;

if (autoApplyStyle) {
  var element = loaderDocument.createElement('style');
  element.innerHTML = content;
  loaderDocument.head.appendChild(element);
}

module.exports = {
  ...(style.locals || style),
  toString: () => (!autoApplyStyle ? content : ''),
};
