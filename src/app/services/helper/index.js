
const contentToElement = (contentText) => {
  const element = document.createElement('div');
  element.innerHTML = (contentText || '').toString().trim();
  return element;
};

const writeElements = (element, contentElement, replaceParent) => {
  if (replaceParent && contentElement.childNodes.length === 1) {
    const parent = element.parentElement;
    const elementIndex = Array.from(parent.childNodes).indexOf(element);

    parent.replaceChild(contentElement.childNodes[0], element);
    return parent.childNodes[elementIndex];
  }

  // eslint-disable-next-line no-param-reassign
  element.innerHTML = contentElement.innerHTML;
  return element;
};

export const HelperService = {
  getJson: (filename, defaultResponse) => fetch(`${VARIABLES.SERVICES.ASSETS}${filename}.json`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error();
    })
    .catch(() => defaultResponse),

  naiveRender: (selector, contentText, replaceParent = false) => Array
    .from(document.querySelectorAll(selector))
    .map(element => writeElements(element, contentToElement(contentText), replaceParent)),
};
