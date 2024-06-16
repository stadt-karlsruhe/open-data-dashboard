export interface DataElement {
    id: string;
    name: string;
    icon: string;
    description?: string;
    href: string;
    type: 'resource' | 'category' | 'dashboard';
    resourceType?: 'PDF' | 'HTML' | 'JSON' | 'GeoJSON' | 'CSV';
}
