
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

    if (element) {
      const newElementParent = document.createElement('div');
      newElementParent.innerHTML = contentText || '';

      if (replace && newElementParent.children.length === 1) {
        const parent = element.parentElement;
        const elementIndex = Array.from(parent.children).indexOf(element);

        parent.replaceChild(newElementParent.children[0], element);
        return parent.children[elementIndex];
      }

      element.innerHTML = newElementParent.innerHTML;
    }
    return element;
  },
};
