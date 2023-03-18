const { defineConfig } = require("cypress");

module.exports = defineConfig({
  "videoUploadOnPasses": false,
  e2e: {
    setupNodeEvents(on, config) {
      //baseUrl: 'http://localhost:8080,
    },
    env: {
      snapshotOnly: true
    }
  },
});
