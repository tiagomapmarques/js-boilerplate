
export const HelperService = {
  getJson: (filename, defaultResponse) => fetch(`${VARIABLES.SERVICES.ASSETS}${filename}.json`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error();
    })
    .catch(() => defaultResponse),

  writeToDocumentById: (id, contentText, replace = true) => {
    const element = document.getElementById(id);
    const newElementParent = document.createElement('div');
    newElementParent.innerHTML = contentText;

    if (element && newElementParent.childNodes.length > 0) {
      if (replace) {
        const parent = element.parentElement;
        const childIndex = Array.from(element.parentElement.children).indexOf(element);
        element.parentElement.replaceChild(newElementParent.children[0], element);
        return parent.children[childIndex];
      }
      element.innerHTML = contentText;
    }
    return element;
  },
};
