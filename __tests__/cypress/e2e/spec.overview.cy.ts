import { Cypress, beforeEach, cy, describe, expect, it } from 'local-cypress';

const resourcesPath = 'en/overview/resources';
const dashboardsPath = 'en/overview/dashboards';
const baseUrl = Cypress.config().baseUrl ?? '';

describe('resources overview tests', () => {
    beforeEach(() => {
        cy.visit(resourcesPath);
    });
    it('overview should contain generic components, title and description', () => {
        cy.get('[data-cy="header"]');
        cy.get('[data-cy="footer"]');
        cy.get('[data-cy="navigation"]');
        cy.get('[data-cy="page-title"]').contains('Data Categories');
        cy.get('[data-cy="page-description"]').contains(
            'On this page you will find an overview of all available data categories.',
        );
    });
    it('top level overview should contain data table and only categories', () => {
        cy.get('.rdt_Table');
        cy.get('.rdt_TableBody')
            .children()
            .each(($child) => {
                expect($child.attr('id')).to.contain('category');
            });
    });
    it('clicking elements should redirect', () => {
        cy.get('[id*=row-category').first().click();
        cy.url().should('not.equal', `${baseUrl}${resourcesPath}`);
        cy.get('[id*=row-resource').first().click();
        cy.url().should('not.contain', resourcesPath);
        cy.url().should('contain', 'en/resource');
    });
});

describe('dashboards overview tests', () => {
    beforeEach(() => {
        cy.visit(dashboardsPath);
    });
    it('overview should contain generic components, title and description', () => {
        cy.get('[data-cy="header"]');
        cy.get('[data-cy="footer"]');
        cy.get('[data-cy="navigation"]');
        cy.get('[data-cy="page-title"]').contains('Dashboards');
        cy.get('[data-cy="page-description"]').contains('On this page you will find an overview of all dashboards.');
    });
    it('overview should contain data table and only dashboards', () => {
        cy.get('.rdt_Table');
        cy.get('.rdt_TableBody')
            .children()
            .each(($child) => {
                expect($child.attr('id')).to.contain('dashboard');
            });
    });
    it('clicking dashboard row should redirect', () => {
        cy.get('[id*=row-dashboard').first().click();
        cy.url().should('not.contain', dashboardsPath);
        cy.url().should('contain', 'en/dashboard');
    });
});
