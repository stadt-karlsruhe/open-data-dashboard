import { beforeEach, cy, describe, it } from 'local-cypress';

describe('resource detail page tests', () => {
    beforeEach(() => {
        cy.visit('en/overview/resources');
        cy.get('[id*=row-category').first().click();
        cy.get('[id*=row-resource').first().click();
    });
    it('detail page should contain title and buttons', () => {
        cy.get('[data-cy="page-title"]');
        cy.get('[data-cy="control-fullscreen"]');
        cy.get('[data-cy="control-embed"]');
        cy.get('[data-cy="control-download"]');
    });
    it('fullscreen button should redirect', () => {
        cy.get('[data-cy="control-fullscreen"]').click();
        cy.url().should('contain', '/embed/resource/');
    });
    it('embed button should work', () => {
        cy.get('[data-cy="control-embed"]').click();
        cy.get('[data-cy="embed-modal"]').contains('Embed resource visualization');
        cy.get('[data-cy="embed-modal"]').contains(
            'The visualization for this resource can be embedded using the following code:',
        );

        cy.get('[data-cy="embed-width"]').clear();
        cy.get('[data-cy="embed-width"]').type('1000');
        cy.get('[data-cy="embed-height"]').clear();
        cy.get('[data-cy="embed-height"]').type('500');
        cy.contains('iframe width="1000" height="500"');
    });
});
