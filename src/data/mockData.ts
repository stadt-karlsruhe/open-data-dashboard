import { Resource } from '@/types/visualization';

export const mockData = [
    {
        id: '1',
        name: 'Bevölkerung mit Hauptwohnung',
        type: 'JSON',
        endpoint: 'https://transparenz.karlsruhe.de/datastore/dump/d8be5f4a-0788-4ee3-abe5-b36313ce3799?format=json',
        skipFields: '^_id$',
        renameFields: {
            'mannlich (%)': 'Männlich (%)',
            'weiblich (%)': 'Weiblich (%)',
        },
    },
    {
        id: '2',
        name: 'Bevölkerung mit Hauptwohnung',
        type: 'JSON',
        endpoint:
            'https://transparenz.karlsruhe.de/api/3/action/datastore_search?resource_id=d8be5f4a-0788-4ee3-abe5-b36313ce3799&limit=450',
    },
    {
        id: '3',
        name: 'mietspiegel-2023',
        type: 'PDF',
        endpoint:
            'https://web6.karlsruhe.de/Stadtentwicklung/statistik/pdf/mietspiegel/karlsruher-mietspiegel-2023.pdf',
    },
] as Resource[];
