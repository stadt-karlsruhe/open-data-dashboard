import { cy, describe, it } from 'local-cypress';

describe('homepage tests', () => {
    // TODO: Add checks for additional homepage content
    it('visiting root should redirect to homepage, homepage should contain elements', () => {
        cy.visit('');
        cy.url().should('include', '/home');
        cy.get('[data-cy="header"]');
        cy.get('[data-cy="footer"]');
        cy.get('[data-cy="navigation"]');
        cy.get('input[placeholder="Search"]');
    });
});
