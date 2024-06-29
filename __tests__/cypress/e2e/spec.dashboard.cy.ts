import {
    barRectangle,
    bevoelkerungProStadtteil,
    datenUndFakten,
    embedModal,
    innenstadtOst,
    leafletMap,
    leafletMarker,
    staedtischeBehoerden,
    zuzuegeUndFortzuege,
} from './cypressConstants';
import { cy, describe, it } from 'local-cypress';

describe('dashboard tests', () => {
    it('dashboard view should contain relevant fields, basic buttons should work', () => {
        cy.visit('en/dashboard/verkehr-und-infrastruktur-2');
        cy.get('[data-cy="page-title"]').contains('Verkehr und Infrastruktur');
        cy.get('[data-cy="page-description"]').contains('Baustellen und Geschwindigkeitsbegrenzungen');

        cy.get('[data-cy="control-embed"]').click();
        cy.get(embedModal).contains('Embed dashboard');
        cy.get(embedModal).contains('This dashboard can be embedded using the following code:');

        cy.get('[data-cy="embed-width"]').clear();
        cy.get('[data-cy="embed-width"]').type('1000');
        cy.get('[data-cy="embed-height"]').clear();
        cy.get('[data-cy="embed-height"]').type('500');
        cy.contains('iframe width="1000" height="500"');
        cy.get(embedModal).find('.modal-header').find('button').click();

        cy.get('[data-cy="control-fullscreen"]').click({ force: true });
        cy.url().should('contain', 'en/embed/dashboard/2');
    });
    it('dashboard view for zugezogene should contain dashboard specific elements, e.g. correct maps', () => {
        cy.visit('en/dashboard/f%C3%BCr-zugezogene-5');

        cy.get(staedtischeBehoerden).find(leafletMap).find('[data-cy="map-reset-button"]');
        cy.get(staedtischeBehoerden).find(leafletMarker);

        cy.get(datenUndFakten).contains('Daten und Fakten');
        cy.get(datenUndFakten).find('[data-cy="dashboard-resource-link"]').click();
        cy.url().should('contain', 'en/resource/daten-und-fakten-20232024-6ea017ac-f3db-4f99-b587-09de9048ad0c');
    });
    it('dashboard view for bevoelkerung should contain dashboard specific elements, e.g. correct diagramms', () => {
        cy.visit('en/dashboard/bev%C3%B6lkerung-1');

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
