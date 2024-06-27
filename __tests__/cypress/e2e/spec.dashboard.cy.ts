import { cy, describe, it } from 'local-cypress';

describe('dashboard tests', () => {
    it('dashboard view should contain relevant fields', () => {
        cy.visit('en/dashboard/bevölkerung-1');
    });
});
