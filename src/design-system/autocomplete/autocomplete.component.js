import debounce from 'debounce';

import template from './autocomplete.template';
import styles from './autocomplete.style';

const DEBOUNCE_DELAY = 300;

export const AutocompleteComponent = {
  ...template,

  props: [
    'className',
    'placeholder',
    'value',
    'suggestions',
    'onChange',
    'onSelect',
  ],

  watch: {
    value(newVal) {
      this.innerValue = newVal;
    },
  },

  created() {
    this.handleInputChange = debounce(this.handleInputChange, DEBOUNCE_DELAY);
  },

  data() {
    return {
      styles,
      innerValue: '',
      forceHideSuggestions: false,
    };
  },

  computed: {
    classNames() {
      return `${styles.container} ${this.className}`;
    },

    hideSuggestions() {
      return this.forceHideSuggestions || !this.innerValue || !this.suggestions;
    },
  },

  methods: {
    handleInputChange() {
      this.forceHideSuggestions = false;

      if (this.onChange) {
        this.onChange(this.innerValue);
      }
    },

    handleInvisibleClick() {
      this.forceHideSuggestions = true;
    },

    handleSuggestionClick(suggestion) {
      this.forceHideSuggestions = true;

      if (this.onSelect) {
        this.onSelect(suggestion);
      }
    },
  },
};
