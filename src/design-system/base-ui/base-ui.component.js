
export const BaseUiComponent = {
  props: ['className'],

  computed: {
    classes() {
      return `${this.styles.parentClass || ''} ${this.className || ''}`.trim();
    },
  },
};
