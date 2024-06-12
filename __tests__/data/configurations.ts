/* eslint-disable sonarjs/no-duplicate-string */
export const mockConfiguration = {
    appearance: {
        theme: 'karlsruhe',
    },
    resources: [
        {
            id: '1',
            source: 'https://transparenz.karlsruhe.de/datastore/dump/71ef348f-0f5b-46a0-8250-e87aae9f91bd?format=json',
            type: 'JSON',
            name: 'Wohnberechtigte Bevölkerung',
            description: 'Die Beschreibung für die Wohnberechtigte Bevölkerung',
            renameProperties: {
                'mannlich (%)': 'Männlich (%)',
                'weiblich (%)': 'Weiblich (%)',
            },
            skipPropertiesRegEx: '^_id$',
            defaultFilters: {
                Jahr: {
                    min: 2009,
                    max: 2009,
                },
            },
            visualizations: {
                barChart: {
                    axisPairs: [
                        {
                            xAxis: 'Stadtteil',
                            yAxis: 'Wohnberechtigte',
                        },
                    ],
                },
                table: {},
            },
        },
        {
            id: '2',
            source: 'https://web6.karlsruhe.de/Stadtentwicklung/statistik/pdf/mietspiegel/karlsruher-mietspiegel-2023.pdf',
            type: 'PDF',
            name: 'Karlsruher Mietspiegel 2023',
        },
    ],
    categories: [
        {
            name: 'Gesellschaft',
            description: 'Hier sind Daten aus dem Bereich Gesellschaft zusammengefasst.',
            icon: 'people-fill',
            resources: ['1', '2'],
        },
    ],
    dashboards: [
        {
            id: 'homepage',
            name: 'Homepage',
            icon: 'house-door-fill',
            contents: [
                {
                    type: 'EXTERNAL',
                    source: 'https://www.wetter.de/widget/heute/u0tyz1rj/false/',
                    name: 'Weather',
                },
            ],
        },
    ],
};

export const mockConfigurationPart1 = {
    appearance: {
        theme: 'karlsruhe',
    },
    resources: [
        {
            id: '1',
            source: 'https://transparenz.karlsruhe.de/datastore/dump/71ef348f-0f5b-46a0-8250-e87aae9f91bd?format=json',
            type: 'JSON',
            name: 'Wohnberechtigte Bevölkerung',
            description: 'Die Beschreibung für die Wohnberechtigte Bevölkerung',
            renameProperties: {
                'mannlich (%)': 'Männlich (%)',
                'weiblich (%)': 'Weiblich (%)',
            },
            skipPropertiesRegEx: '^_id$',
            defaultFilters: {
                Jahr: {
                    min: 2009,
                    max: 2009,
                },
            },
            visualizations: {
                barChart: {
                    axisPairs: [
                        {
                            xAxis: 'Stadtteil',
                            yAxis: 'Wohnberechtigte',
                        },
                    ],
                },
                table: {},
            },
        },
    ],
    categories: [
        {
            name: 'Gesellschaft',
            description: 'Hier sind Daten aus dem Bereich Gesellschaft zusammengefasst.',
            icon: 'people-fill',
            resources: ['1', '2'],
        },
    ],
    dashboards: [
        {
            id: 'homepage',
            name: 'Homepage',
            icon: 'house-door-fill',
            contents: [
                {
                    type: 'EXTERNAL',
                    source: 'https://www.wetter.de/widget/heute/u0tyz1rj/false/',
                    name: 'Weather',
                },
            ],
        },
    ],
};

export const mockConfigurationPart2 = {
    appearance: {
        theme: 'karlsruhe',
    },
    resources: [
        {
            id: '2',
            source: 'https://web6.karlsruhe.de/Stadtentwicklung/statistik/pdf/mietspiegel/karlsruher-mietspiegel-2023.pdf',
            type: 'PDF',
            name: 'Karlsruher Mietspiegel 2023',
        },
    ],
    categories: [
        {
            name: 'Gesellschaft',
            description: 'Hier sind Daten aus dem Bereich Gesellschaft zusammengefasst.',
            icon: 'people-fill',
            resources: ['1', '2'],
        },
    ],
    dashboards: [
        {
            id: 'homepage',
            name: 'Homepage',
            icon: 'house-door-fill',
            contents: [
                {
                    type: 'EXTERNAL',
                    source: 'https://www.wetter.de/widget/heute/u0tyz1rj/false/',
                    name: 'Weather',
                },
            ],
        },
    ],
};
/* eslint-enable sonarjs/no-duplicate-string */
