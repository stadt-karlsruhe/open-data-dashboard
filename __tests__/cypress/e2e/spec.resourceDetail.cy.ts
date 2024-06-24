/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable max-lines-per-function */
/* eslint-disable unicorn/no-array-callback-reference */
/* eslint-disable max-statements */
import { beforeEach, cy, describe, it } from 'local-cypress';

const embedModal = '[data-cy="embed-modal"]';
const barChart = '[data-cy="bar-chart"]';
const barRectangle = '.recharts-bar-rectangle';
const tableBody = '.rdt_TableBody';

describe('resource detail page tests', () => {
    it('detail page should contain title and buttons, embed button should work, fullscreen should redirect', () => {
        cy.visit('/en/resource/hunde-insgesamt-5');
        cy.url().should('contain', 'visualization=barChart');

        cy.get('[data-cy="page-title"]').contains('Hunde insgesamt');
        cy.get('[data-cy="control-fullscreen"]');
        cy.get('[data-cy="control-embed"]');
        cy.get('[data-cy="control-download"]');

        cy.get('[data-cy="control-embed"]').click();
        cy.get(embedModal).contains('Embed resource visualization');
        cy.get(embedModal).contains('The visualization for this resource can be embedded using the following code:');

        cy.get('[data-cy="embed-width"]').clear();
        cy.get('[data-cy="embed-width"]').type('1000');
        cy.get('[data-cy="embed-height"]').clear();
        cy.get('[data-cy="embed-height"]').type('500');
        cy.contains('iframe width="1000" height="500"');
        cy.get(embedModal).find('.modal-header').find('button').click();

        cy.get('[data-cy="control-fullscreen"]').click();
        cy.url().should('contain', '/embed/resource/5');
    });
    it('detail page should have working bar chart, table, and filter', () => {
        cy.visit('/en/resource/hunde-insgesamt-5');
        cy.get(barChart).contains('Hunde');
        cy.get(barChart).find(barRectangle).first().click();
        cy.get(barChart).contains('Hunde : 101');
        cy.get(barChart).contains('Innenstadt-Ost');

        cy.get('[data-cy="layout-tabs"]').find('button').contains('Table').as('tableButton').click();
        cy.get('.rdt_TableHead').contains('Hunde je 1');
        cy.get(tableBody).children().should('have.length', '10');
        cy.get('.rdt_Pagination').find('select').select('20');
        cy.get(tableBody).children().should('have.length', '20');
        cy.get('.rdt_Pagination').find('[id="pagination-last-page"]').click();
        cy.get(tableBody).children().first().contains('0');

        cy.get('[data-cy="layout-tabs"]').find('button').contains('Bar Chart').as('chartButton').click();
        cy.get('[id="5-search"]').type('Grünwinkel');
        cy.get(barChart).find(barRectangle).first().click();
        cy.get(barChart).contains('Hunde : 388');
        cy.get(barChart).contains('Grünwinkel');

        cy.get('.input-group').find('[data-cy="toggle-filters"]').as('toggle').click();
        cy.get('.input-group').find('[data-cy="clear"]').first().click();
        cy.get('[id="5-Stadtteil-text-input"]').type('Knielingen');
        cy.get('[id="5-Jahr-min"]').type('2019');
        cy.get('[id="5-Jahr-max"]').type('2019');
        cy.get('[id="5-Hunde-min"]').type('456');

        cy.get(barChart).find(barRectangle).click();
        cy.get(barChart).contains('Hunde : 456');
        cy.get(barChart).contains('Knielingen');

        cy.get('[data-cy="clear-all"]').click();
        cy.get('@toggle').click();

        cy.get(barChart).find(barRectangle).first().click();
        cy.get(barChart).contains('Hunde : 101');
        cy.get(barChart).contains('Innenstadt-Ost');
    });
});
