import { AutocompleteComponent as BaseAutocomplete } from 'design-system';
import { WeatherService } from 'services';

import template from './autocomplete.template';
import styles from './autocomplete.style';

export const AutocompleteComponent = {
  ...template,

  props: ['translate', 'className', 'useMockApi', 'onChange'],

  components: {
    autocomplete: BaseAutocomplete,
  },

  data() {
    return {
      styles,
      value: '',
      suggestions: null,
    };
  },

  computed: {
    mappedSuggestions() {
      return this.suggestions ? this.suggestions.map(suggestion => ({
        text: `${suggestion.LocalizedName}, ${suggestion.AdministrativeArea.LocalizedName} (${suggestion.Country.LocalizedName})`,
        data: suggestion.Key,
      })) : null;
    },
  },

  methods: {
    handleChange(value) {
      this.value = value;

      if (this.value) {
        WeatherService.getCitiesByName(this.value, this.useMockApi).then((data) => {
          this.suggestions = data;
        });
      }
    },

    handleSelect(key) {
      this.value = this.suggestions.find(suggestion => suggestion.Key === key).LocalizedName;
      this.suggestions = null;

      if (this.onChange) {
        this.onChange(key);
      }
    },
  },
};
