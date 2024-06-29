import {
    barChart,
    barRectangle,
    bevoelkerungProStadtteil,
    hundeId,
    innenstadtOst,
    inputGroup,
    kinoId,
    leafletMap,
    leafletMarker,
    zuzuegeUndFortzuege,
} from './cypressConstants';
import { cy, describe, it } from 'local-cypress';

describe('embed resource page tests', () => {
    it('embed page for JSON data should contain filter buttons and barChart', () => {
        cy.visit(`en/embed/resource/${hundeId}`);
        cy.get(inputGroup).find('[data-cy="toggle-filters"]');
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
        cy.get(leafletMap).find(leafletMarker).first().click();
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
