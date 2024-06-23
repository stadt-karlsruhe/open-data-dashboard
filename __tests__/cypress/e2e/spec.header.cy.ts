import { cy, describe, it } from 'local-cypress';

const searchbar = '[data-cy="header-searchbar"]';

describe('header tests', () => {
    it('header on homepage should contain title, logos, and empty searchbar', () => {
        cy.visit('');
        cy.get('[data-cy="header"]').as('header');
        cy.get('@header').contains('Open Data Dashboard');
        cy.get('@header').get('[data-cy="header-logo"]');
        cy.get('@header').get('[data-cy="header-logo-small"]');
        cy.get('@header').get(searchbar).children().should('not.exist');
    });
    it('header not on homepage should contain title, logos and searchbar', () => {
        cy.visit('en/overview');
        cy.get('[data-cy="header"]').as('header');
        cy.get('@header').contains('Open Data Dashboard');
        cy.get('@header').get('[data-cy="header-logo"]');
        cy.get('@header').get('[data-cy="header-logo-small"]');
        cy.get('@header').get(searchbar).children();
    });
});
