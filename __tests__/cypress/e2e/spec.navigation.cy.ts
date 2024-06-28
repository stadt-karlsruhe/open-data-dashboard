import { beforeEach, cy, describe, it } from 'local-cypress';

import { baseUrl } from './cypressConstants';

const nav = '@navigation';

describe('navigation tests', () => {
    beforeEach(() => {
        cy.visit('/en');
    });
    it('navigation should contain home, dashboards and data, links should redirect', () => {
        cy.get('[data-cy="navigation"]').as('navigation');
        cy.get(nav).find('[data-cy="navigation-home"]').should('have.attr', 'href', '/en/home');
        cy.get(nav).find('[data-cy="navigation-dashboards"]').should('have.attr', 'href', '/en/overview/dashboards');
        cy.get(nav).find('[data-cy="navigation-data"]').should('have.attr', 'href', '/en/overview/resources');

        cy.get('[data-cy="navigation-home"]').click();
        cy.url().should('equal', `${baseUrl}/en/home`);
        cy.get('[data-cy="navigation-dashboards"]').click();
        cy.url().should('equal', `${baseUrl}/en/overview/dashboards`);
        cy.get('[data-cy="navigation-data"]').click();
        cy.url().should('equal', `${baseUrl}/en/overview/resources`);

        cy.get('[data-cy="navigation-dashboards-secondary"]').first().click();
        cy.url().should('not.equal', `${baseUrl}/en/overview/dashboards`);
        cy.url().should('include', '/dashboard');
        cy.get('[data-cy="navigation-data-secondary"]').first().click();
        cy.url().should('not.equal', `${baseUrl}/en/overview/resources`);
        cy.url().should('include', '/overview/resources');
    });
});
