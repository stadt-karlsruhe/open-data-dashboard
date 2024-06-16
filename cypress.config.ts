import { defineConfig } from 'cypress';

export default defineConfig({
    downloadsFolder: '__tests__/cypress/downloads',
    fixturesFolder: '__tests__/cypress/fixtures',
    e2e: {
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
        baseUrl: 'http://localhost:3000',
        supportFolder: '__tests__/cypress/support',
        supportFile: '__tests__/cypress/support/e2e.ts',
        specPattern: '__tests__/cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    },
});
