
const mockElement = (tagName, id, attributes = {}) => {
  beforeEach(() => {
    attributes = { id, ...attributes };
    const element = document.createElement(tagName);
    Object.keys(attributes).forEach((attr) => element.setAttribute(attr, attributes[attr]));
    document.body.appendChild(element);
  });

  afterEach(() => {
    const element = document.getElementById(id);
    element.parentNode.removeChild(element);
  });
};

export default mockElement;
