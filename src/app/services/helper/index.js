
export const HelperService = {
  getJson: (filename, defaultResponse) => fetch(`${SERVICES.ASSETS}${filename}.json`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error();
    })
    .catch(() => defaultResponse),
};
