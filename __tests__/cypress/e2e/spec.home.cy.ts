import { cy, describe, it } from 'local-cypress';

describe('homepage tests', () => {
    it('visiting root should redirect to homepage, homepage should contain elements, search should work', () => {
        cy.visit('');
        cy.url().should('include', '/home');

        cy.get('[data-cy="header"]');
        cy.get('[data-cy="footer"]');
        cy.get('[data-cy="navigation"]');

        cy.get('input[placeholder="Search"]').as('inputField').type('Wohnberechtigte');
        cy.contains('Wohnberechtigte Bevölkerung');
        cy.get('@inputField').clear();
        cy.get('@inputField').type('Wohnerecht');
        cy.contains('Wohnberechtigte Bevölkerung');

        cy.get('[data-cy="dashboard-resource-2a7fd644-bc67-477a-bb9e-cf88f076b7af"]');
        cy.get('[data-cy="dashboard-carousel"]');
    });
});
