
export const createElement = (parentNode, tagName, attributes) => {
  if (attributes.id) {
    beforeEach(() => {
      const element = document.createElement(tagName);
      Object.keys(attributes).forEach(attr => element.setAttribute(attr, attributes[attr]));
      (typeof parentNode === 'function' ? parentNode() : parentNode).appendChild(element);
    });

    afterEach(() => {
      const element = document.getElementById(attributes.id);
      if (element && typeof element.remove === 'function') {
        element.remove();
      }
    });
  } else {
    throw new Error(`Missing "id" in new DOM element. Options were ${JSON.stringify(attributes)}`);
  }
};
