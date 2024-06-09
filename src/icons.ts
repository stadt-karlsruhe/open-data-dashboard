import { JSONResource, Resource } from './schemas/configuration-schema';

export function getIconForResource(resource: Resource) {
    switch (resource.type) {
        case 'CSV':
        case 'JSON': {
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
            const visualizedResource = resource as JSONResource;
            return visualizedResource.visualizations.barChart ? 'bar-chart-fill' : 'table';
        }
        case 'GeoJSON': {
            return 'geo-alt';
        }
        case 'HTML': {
            return 'filetype-html';
        }
        case 'PDF': {
            return 'file-earmark-pdf';
        }
        default: {
            return 'clipboard-data';
        }
    }
}
