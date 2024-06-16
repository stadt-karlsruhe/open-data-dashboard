import { cy, describe, it } from 'local-cypress';

const searchbar = 'input[placeholder="Search"]';

describe('homepage tests', () => {
    it('visiting root should redirect to homepage', () => {
        cy.visit('');
        cy.url().should('include', '/home');
    });
    it('homepage should contain title', () => {
        cy.visit('');
        cy.get('title').contains('Open Data Dashboard');
    });
    it('homepage should contain searchbar', () => {
        cy.visit('');
        cy.get(searchbar);
    });
    it('searchbar should find entry', () => {
        cy.visit('');
        cy.get(searchbar).type('Wohnberechtigte');
        cy.contains('Wohnberechtigte Bevölkerung');
    });
    it('searchbar should find entry with typos', () => {
        cy.visit('');
        cy.get(searchbar).type('Wohnerecht');
        cy.contains('Wohnberechtigte Bevölkerung');
    });
});
