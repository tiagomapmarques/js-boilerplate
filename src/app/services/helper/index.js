
export const HelperService = {
  getJson: (filename, defaultResponse) => fetch(`${VARIABLES.SERVICES.ASSETS}${filename}.json`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error();
    })
    .catch(() => defaultResponse),

  writeToDocumentById: (id, contentText) => {
    const element = document.getElementById(id);
    if (element) {
      element.innerHTML = contentText;
    }
    return element;
  },
};
