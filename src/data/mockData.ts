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
        // Transparenzportal currently not available
        endpoint: 'https://mocki.io/v1/6f1ad2df-8cbb-4928-af84-b3dffe7f7022',
        // endpoint:
        //     'https://transparenz.karlsruhe.de/api/3/action/datastore_search?resource_id=d8be5f4a-0788-4ee3-abe5-b36313ce3799&limit=450',
    },
    {
        id: '3',
        name: 'mietspiegel-2023',
        type: 'PDF',
        endpoint:
            'https://web6.karlsruhe.de/Stadtentwicklung/statistik/pdf/mietspiegel/karlsruher-mietspiegel-2023.pdf',
    },
    {
        id: '4',
        name: 'nachhaltigkeit-in-karlsruhe-2021',
        type: 'PDF',
        endpoint:
            'https://www.karlsruhe.de/securedl/sdl-eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2ODc2OTc0OTAsImV4cCI6MzMyMTc2MjY0NTYsInVzZXIiOjAsImdyb3VwcyI6WzAsLTFdLCJmaWxlIjoiZmlsZWFkbWluL3VzZXJfdXBsb2FkLzAzX1Vtd2VsdF9LbGltYS8wMzdfTmFjaGhhbHRpZ2tlaXQvTmFjaGhhbHRpZ2tlaXRzYmVyaWNodC9OYWNoaGFsdGlna2VpdHNiZXJpY2h0XzIwMjFfZmluYWxfa2xlaW4ucGRmIiwicGFnZSI6NDA0OH0.x7S055gbpebaEUEsl31q74XYZHfT52Ghzho1HByIN-Q/Nachhaltigkeitsbericht_2021_final_klein.pdf',
    },
    {
        id: '5',
        name: 'Bevölkerung mit Hauptwohnung',
        type: 'JSON',
        visType: 'CHART',
        // TODO: Change this to an actual endpoint once the Transparenzportal is available again.
        endpoint: 'https://mocki.io/v1/6f1ad2df-8cbb-4928-af84-b3dffe7f7022',
        yAxis: 'Wohnberechtigte',
        xAxis: 'Stadtteile',
    },
] as Resource[];
