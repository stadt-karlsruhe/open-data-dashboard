# Cypress

The Open Data Dashboard uses Cypress end-to-end tests to ensure that our application can always meet certain user expectations.

## Running Cypress tests on your local system

### Setup

In order to execute Cypress tests on your local system, you will first need to have an instance of the application running.
To do this, navigate to the applications root folder, and then, in your terminal, execute either:

```bash title="Run Next.js development server for Cypress"
npm run dev:cypress
```

or

```bash title="Build Next.js application for Cypress and start application"
npm run build:cypress
npm run start:cypress
```

The "cypress" suffix ensures that we load the correct configuration for the tests,
since we do not want to depend on the production configuration for testing.

### Execution

To execute the tests themselves, there are again two options: The Cypress app, or the terminal.
Executing them in the terminal is very straightforward:

```bash title="Execute all Cypress tests from the terminal"
npx cypress run
```

Using the desktop app is a bit more work, but it results in a more holistic experience:

```bash title="Start the Cypress app"
npx cypress open
```

Once the dashboard is up and running, select E2E Testing, and then a browser of your choice. All of the tests are contained within spec.*.cy.ts files,
which can be executed right from the dashboard.

For further information on the Cypress app, see [here](https://docs.cypress.io/guides/core-concepts/cypress-app#__docusaurus_skipToContent_fallback)
