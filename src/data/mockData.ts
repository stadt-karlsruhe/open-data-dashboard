/* eslint eslint-comments/disable-enable-pair: [error, {allowWholeFile: true}] */
/* eslint-disable sonarjs/no-duplicate-string */
import { Resource } from '@/types/visualization';

export const mockData = [
    {
        id: '1',
        name: 'Bevölkerung mit Hauptwohnung',
        type: 'JSON',
        // endpoint: 'https://transparenz.karlsruhe.de/datastore/dump/71ef348f-0f5b-46a0-8250-e87aae9f91bd?format=json',
        endpoint: 'https://mocki.io/v1/6f1ad2df-8cbb-4928-af84-b3dffe7f7022',
        skipFields: '^_id$',
        renameFields: {
            'mannlich (%)': 'Männlich (%)',
            'weiblich (%)': 'Weiblich (%)',
        },
        diagrams: [
            {
                type: 'CHART',
                yAxis: 'Wohnberechtigte',
                xAxis: 'Stadtteil',
            },
            {
                type: 'CHART',
                yAxis: 'Hauptwohnung (%)',
                xAxis: 'Stadtteil',
            },
            {
                type: 'CHART',
                yAxis: 'Nebenwohnung (%)',
                xAxis: 'Stadtteil',
            },
            {
                type: 'TABLE',
            },
        ],
    },
    {
        id: '2',
        name: 'Bevölkerung mit Hauptwohnung',
        type: 'JSON',
        endpoint:
            'https://transparenz.karlsruhe.de/api/3/action/datastore_search?limit=450&resource_id=71ef348f-0f5b-46a0-8250-e87aae9f91bd',
        diagrams: [
            {
                type: 'CHART',
                yAxis: 'Wohnberechtigte',
                xAxis: 'Stadtteil',
            },
            {
                type: 'TABLE',
            },
        ],
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
        type: 'CSV',
        endpoint: 'https://transparenz.karlsruhe.de/datastore/dump/71ef348f-0f5b-46a0-8250-e87aae9f91bd?bom=True',
        diagrams: [
            {
                type: 'CHART',
                yAxis: 'Wohnberechtigte',
                xAxis: 'Stadtteil',
            },
            {
                type: 'TABLE',
            },
        ],
    },
    {
        id: '6',
        name: 'Points of Interest: Kinos',
        type: 'GeoJSON',
        endpoint:
            'https://geoportal.karlsruhe.de/server/rest/services/Stadtplan/Stadtplan_POIs_Kultur/MapServer/3/query?where=GRUPPENNAME_DE+%3D+%27Kinos%27&outFields=NAME%2CGRUPPENNAME_DE%2CUPDATED&returnGeometry=true&f=geojson',
    },
    {
        id: '7',
        name: 'Wanderungssaldo',
        type: 'JSON',
        endpoint: 'https://mocki.io/v1/becc7043-0251-46e9-8f2b-81a6b904fe86',
        // endpoint: 'https://transparenz.karlsruhe.de/datastore/dump/e3e69806-4903-44c4-a17d-bce2a940d3a0?format=json',
        diagrams: [
            {
                type: 'CHART',
                yAxis: 'Personen',
                xAxis: 'Stadtteil',
            },
            {
                type: 'TABLE',
            },
        ],
    },
] as Resource[];
