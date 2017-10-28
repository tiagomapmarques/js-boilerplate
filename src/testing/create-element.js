
const createElement = (parentNode, tagName, attributes) => {
  if (attributes.id) {
    beforeEach(() => {
      const element = document.createElement(tagName);
      Object.keys(attributes).forEach((attr) => element.setAttribute(attr, attributes[attr]));
      (typeof parentNode === 'function' ? parentNode() : parentNode).appendChild(element);
    });

    afterEach(() => {
      const element = document.getElementById(attributes.id);
      element.parentNode.removeChild(element);
    });
  } else {
    throw new Error(`You must set an "id" attribute when creating a DOM element. Attributes given were: ${JSON.stringify(attributes)}`);
  }
};

export default createElement;