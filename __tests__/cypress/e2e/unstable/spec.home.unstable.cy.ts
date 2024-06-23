import { cy, describe, it } from 'local-cypress';

describe('config dependent homepage tests', () => {
    it('search in homepage should work and find elements', () => {
        cy.visit('');
        cy.get('input[placeholder="Search"]').as('inputField').type('Wohnberechtigte');
        cy.contains('Wohnberechtigte Bevölkerung');
        cy.get('@inputField').clear();
        cy.get('@inputField').type('Wohnerecht');
        cy.contains('Wohnberechtigte Bevölkerung');
    });
});
