import { actionStatus } from 'vuex-automap';

import { mappers } from 'states';

export default {
  created() {
    this.sampleInit().then(this.printData);
  },
  computed: {
    ...mappers.sample.state,
    ...mappers.sample.getters,
  },
  methods: {
    ...mappers.sample.actions,
    allReady() {
      return this.sampleIsStatusReady && !this.stillLoading();
    },
    stillLoading() {
      return this.sampleIsStatusLoading && !this.anyError();
    },
    anyError() {
      return this.sampleIsStatusError;
    },
    printData(actionResult) {
      if (actionResult.status === actionStatus.ok) {
        console.log(this.sampleData.console); // eslint-disable-line no-console
      } else {
        console.error(actionResult.message); // eslint-disable-line no-console
      }
    },
  },
};
