import jquery from 'jquery';

const contentToElement = (contentText) => {
  const element = document.createElement('div');
  element.innerHTML = (contentText || '').toString().trim();
  return element;
};

const writeElements = (element, contentElement, replaceParent) => {
  if (replaceParent && contentElement.childNodes.length === 1) {
    const parent = element.parent();
    const elementIndex = parent.children().index(element);

    element.replaceWith(contentElement.children[0]);
    return parent.children()[elementIndex];
  }

  element.html(contentElement.innerHTML);
  return element[0];
};

export const HelperService = {
  getJson: (filename, defaultResponse) => fetch(`${SERVICES.ASSETS}${filename}.json`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error();
    })
    .catch(() => defaultResponse),

  naiveRender: (selector, contentText, replaceParent = false) => Array
    .from(jquery(selector))
    .map((element) => writeElements(jquery(element), contentToElement(contentText), replaceParent)),
};
