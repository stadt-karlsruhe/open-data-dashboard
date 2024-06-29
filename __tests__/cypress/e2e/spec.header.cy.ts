import { cy, describe, it } from 'local-cypress';

import { searchbar } from './cypressConstants';

describe('header tests', () => {
    it('header on homepage should contain title, logos, and empty searchbar', () => {
        cy.visit('');
        cy.get('[data-cy="header"]').as('header');
        cy.get('@header').contains('Open Data Dashboard');
        cy.get('@header').find('[data-cy="header-logo"]');
        cy.get('@header').find('[data-cy="header-logo-small"]');
        cy.get('@header').find(searchbar).children().should('not.exist');
    });
    it('header not on homepage should contain title, logos and searchbar, search in header should work', () => {
        cy.visit('en/overview');
        cy.get('[data-cy="header"]').as('header');
        cy.get('@header').contains('Open Data Dashboard');
        cy.get('@header').find('[data-cy="header-logo"]');
        cy.get('@header').find('[data-cy="header-logo-small"]');
        cy.get('@header').find(searchbar).children();

        cy.get(searchbar).find('input[placeholder="Search"]').first().as('inputField').type('Wohnberechtigte');
        cy.contains('Wohnberechtigte Bevölkerung');
        cy.get('@inputField').clear();
        cy.get('@inputField').type('Wohnerecht');
        cy.contains('Wohnberechtigte Bevölkerung');
    });
});
