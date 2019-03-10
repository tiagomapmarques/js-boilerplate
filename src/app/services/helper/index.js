
export const HelperService = {
  getJson: (filename, defaultResponse) => fetch(`${SERVICES.ASSETS}${filename}.json`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error();
    })
    .catch(() => defaultResponse),

  createElement: (tagName, content = '') => {
    const element = document.createElement(tagName);
    element.innerHTML = typeof content === 'string' ? content : content.toString();
    return element;
  },

  createStyleElement: style => HelperService.createElement('style', style),
};
