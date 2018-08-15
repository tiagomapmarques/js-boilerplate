
export const mockStyle = styleModule => Object.keys(styleModule.default)
  .reduce((collection, key) => ({
    ...collection,
    [key]: `mock-${key}-class`,
  }), {});
