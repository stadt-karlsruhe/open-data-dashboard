import { cy, describe, it } from 'local-cypress';

const searchbar = '[data-cy="header-searchbar"]';

describe('config dependent header tests', () => {
    it('search in header should work and find elements', () => {
        cy.visit('en/overview');
        cy.get(searchbar).get('input[placeholder="Search"]').first().as('inputField').type('Wohnberechtigte');
        cy.contains('Wohnberechtigte Bevölkerung');
        cy.get('@inputField').clear();
        cy.get('@inputField').type('Wohnerecht');
        cy.contains('Wohnberechtigte Bevölkerung');
    });
});
