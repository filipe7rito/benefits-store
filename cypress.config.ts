import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    video: false,
    baseUrl: 'http://localhost:5173',
    viewportWidth: 1280,
    viewportHeight: 720,
    setupNodeEvents(on, config) {},
  },
});
