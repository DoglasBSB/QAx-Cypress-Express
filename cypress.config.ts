import { defineConfig } from 'cypress'

export default defineConfig({
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
