import { Cypress } from 'local-cypress';

// URLs and Paths
export const baseUrl = Cypress.config().baseUrl ?? '';
export const resourcesPath = 'en/overview/resources';
export const dashboardsPath = 'en/overview/dashboards';

// UUIDs
export const hundeId = 'a5f04b45-528a-41b5-8d8c-eb9677bf2fd1';
export const kinoId = 'e5e6b5fa-c32b-4477-9e99-01037bce51e0';

// Generic Components
export const inputGroup = '.input-group';
export const barChart = '[id*="barChart"]';
export const barRectangle = '.recharts-bar-rectangle';
export const leafletMap = '.leaflet-container';
export const leafletMarker = '.leaflet-marker-icon';
export const tableBody = '.rdt_TableBody';
export const embedModal = '[data-cy="embed-modal"]';
export const searchbar = '[data-cy="header-searchbar"]';

// Specific Components
export const staedtischeBehoerden = '[data-cy="dashboard-resource-31876be7-9487-461e-bc10-c470c4a05f1b"]';
export const datenUndFakten = '[data-cy="dashboard-resource-6ea017ac-f3db-4f99-b587-09de9048ad0c"]';
export const bevoelkerungProStadtteil = '[data-cy="dashboard-resource-71ef348f-0f5b-46a0-8250-e87aae9f91bd"]';
export const zuzuegeUndFortzuege = '[data-cy="dashboard-resource-8dc0dc8e-6c17-4d98-b29e-5a08a1bb6509"]';

// Strings
export const innenstadtOst = 'Innenstadt-Ost';
