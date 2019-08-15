/* eslint-disable */
var __assign = (this && this.__assign) || function () {
  __assign = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
        t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};

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

module.exports = __assign(
  {},
  (style.locals || style),
  {
    toString: function () { return (!autoApplyStyle ? content : ''); }
  }
);
/* eslint-enable */
