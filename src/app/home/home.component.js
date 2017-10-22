
export default {
  created() {
    this.run();
  },

  data: function() {
    return {
      pageData: '',
    };
  },

  methods: {
    run() {
      this.getSampleData().then(this.build);
    },

    getSampleData() {
      return fetch('/assets/sample.json').then((data) => data.json());
    },

    build(data) {
      this.pageData = data.page;
      console.log(data.console); // eslint-disable-line no-console
    },
  },
};
