import { TranslationService } from 'services';

export const BaseContainer = {
  props: ['route'],

  methods: {
    ...TranslationService.componentFunctions,
  },
};
