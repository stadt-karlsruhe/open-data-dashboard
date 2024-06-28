// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable unicorn/no-array-callback-reference */
import { cy, describe, it } from 'local-cypress';

const hundeId = 'a5f04b45-528a-41b5-8d8c-eb9677bf2fd1';
const kinoId = 'e5e6b5fa-c32b-4477-9e99-01037bce51e0';
const barChart = '[id*="barChart"]';
const barRectangle = '.recharts-bar-rectangle';
const innenstadtOst = 'Innenstadt-Ost';
const leafletMap = '.leaflet-container';
const bevoelkerungProStadtteil = '[data-cy="dashboard-resource-71ef348f-0f5b-46a0-8250-e87aae9f91bd"]';
const zuzuegeUndFortzuege = '[data-cy="dashboard-resource-8dc0dc8e-6c17-4d98-b29e-5a08a1bb6509"]';

describe('embed resource page tests', () => {
    it('embed page for JSON data should contain filter buttons and barChart', () => {
        cy.visit(`en/embed/resource/${hundeId}`);
        cy.get('.input-group').find('[data-cy="toggle-filters"]');
        cy.get('[data-cy="clear-all"]');

        cy.get(barChart).contains('Hunde');
        cy.get(barChart).find(barRectangle).first().click();
        cy.get(barChart).contains('Hunde : 94');
        cy.get(barChart).contains(innenstadtOst);
    });
    it('embed page for geoJSON data should contain legend, reset button and tooltips', () => {
        cy.visit(`en/embed/resource/${kinoId}`);
        cy.get(leafletMap).find('[data-cy="map-reset-button"]');
        cy.get(leafletMap).find('[data-cy="map-legend"]');
        cy.get(leafletMap).find('.leaflet-marker-icon').first().click();
        cy.contains('Name: ');
        cy.contains('Gruppe: ');
    });
});
describe('embed dashboard page tests', () => {
    it('embed dashboard page should contain specific resources', () => {
        cy.visit('en/embed/dashboard/1');

        cy.get(bevoelkerungProStadtteil).contains('Bevölkerung pro Stadtteil');
        cy.get(bevoelkerungProStadtteil).find(barRectangle).first().click();
        cy.contains(innenstadtOst);
        cy.contains('Jahr : 2021');
        cy.contains('Wohnberechtigte : 6450');

        cy.get(zuzuegeUndFortzuege).contains('Zuzüge und Fortzüge');
        cy.get(zuzuegeUndFortzuege).find(barRectangle).first().click();
        cy.contains(innenstadtOst);
        cy.contains('Jahr : 2021');
        cy.contains('Personen : -10');
    });
});
