import { defineConfig } from 'cypress'

export default defineConfig({
  "videoUploadOnPasses": false,
  e2e: {
    baseUrl: 'http://localhost:8080',
    env: {
      apiUrl: 'http://localhost:3333',
      snapshotOnly: true,
    },
    
    setupNodeEvents(on, config) {
      // implement node event listeners here
    }, 
  },
});
