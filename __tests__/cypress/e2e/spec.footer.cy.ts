import { beforeEach, cy, describe, it } from 'local-cypress';

describe('footer tests', () => {
    beforeEach(() => {
        cy.visit('');
    });
    it('footer should contain legal notice link, github link and language selector', () => {
        cy.get('[data-cy="footer"]').as('footer');
        cy.get('@footer').find('[data-cy="footer-legal-notice"]');
        cy.get('@footer').find('[data-cy="footer-github"]');
        cy.get('@footer').find('[data-cy="locale-switcher"]');
    });
    it('legal notice link should redirect to legal notice page', () => {
        cy.get('[data-cy="footer-legal-notice"]').click();
        cy.url().should('contain', 'legal-notice');
        cy.get('[data-cy="page-title"]').contains('Legal Notice and Privacy Policy');
    });
    it('locale switcher should work', () => {
        cy.get('[data-cy="locale-switcher"]').find('select').as('localeSwitcher').select('de');
        cy.url().should('contain', 'de');
        cy.get('@localeSwitcher').select('en');
        cy.url().should('contain', 'en');
    });
});
