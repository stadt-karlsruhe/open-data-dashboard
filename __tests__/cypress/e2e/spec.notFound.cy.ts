import { cy, describe, it } from 'local-cypress';

describe('not found', () => {
    it('visiting non existing page should display not found page', () => {
        cy.on('uncaught:exception', () => {
            return false;
        });
        cy.visit('/en/this/url/certainly/does/not/exist', { failOnStatusCode: false });

        cy.contains("Oops! You're lost.");
        cy.get('[data-cy="error-home"]').click();
        cy.url().should('contain', '/home');
    });
});
